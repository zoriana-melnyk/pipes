import mongoose from 'mongoose';
import { collectionNames } from './helpers';
import jwt from 'jsonwebtoken';
import { hashPassword, verifyPassword } from '../lib/auth';
const USER_SECRET = process.env.SECRET || 'secret';

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    phoneNumber: Number,
    email: {
      type: String,
      required: true,
      trim: true,
      unique: 1,
    },
    avatarUrl: String,
    cart: { type: mongoose.Schema.Types.ObjectId, ref: collectionNames.cart },
    role: { default: 'user', type: String },
    orders: [
      { type: mongoose.Schema.Types.ObjectId, ref: collectionNames.order },
    ],
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateToken = async function () {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), USER_SECRET);
  user.token = token;

  try {
    return await user.save();
  } catch (error) {
    throw new Error(error);
  }
};

userSchema.methods.comparePassword = async function (pass) {
  return await verifyPassword(pass, this.password);
};

userSchema.statics.findByToken = async function (token) {
  const user = this;
  const decoded = await jwt.verify(token, USER_SECRET);
  return await user.findOne({ _id: decoded, token });
};

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = hashPassword(user.password);
    next();
  } else {
    next();
  }
});

const UserModel =
  mongoose.models.User || mongoose.model(collectionNames.user, userSchema);

export { UserModel };

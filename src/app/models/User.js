import mongoose from "mongoose";
import { collectionNames } from "./helpers";

const UserScheme = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: Number,
    email: String,
    avatarUrl: String,
    cart: { type: mongoose.Schema.Types.ObjectId, ref: collectionNames.cart },
    role: { default: 'user', type: String },
    password: String,
}, {
    timestamps: true
});

const UserModel = mongoose.models.User || mongoose.model(collectionNames.user, UserScheme);

export { UserModel };
import mongoose from "mongoose";
import { collectionNames } from "./helpers";

const UserScheme = new mongoose.Schema({
    name: String,
    secondName: String,
    phoneNumber: Number,
    email: String,
    cart: { type: mongoose.Schema.Types.ObjectId, ref: collectionNames.cart },
}, {
    timestamps: true
});

const UserModel = mongoose.models.User || mongoose.model(collectionNames.user, UserScheme);

export { UserModel };
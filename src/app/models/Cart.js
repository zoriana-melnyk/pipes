import mongoose from "mongoose";
import { collectionNames } from "./helpers";

const CartSchema = mongoose.Schema({
    name: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: collectionNames.user },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.cartProduct }],
}, {
    timestamps: true
});

const CartModel = mongoose.models.Cart || mongoose.model(collectionNames.cart, CartSchema);

export { CartModel }
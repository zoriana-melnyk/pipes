import mongoose from "mongoose";
import { collectionNames } from "./helpers";

const CartProductSchema = new mongoose.Schema({
    amount: Number,
    product: { type: mongoose.Schema.Types.ObjectId, ref: collectionNames.product },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: collectionNames.cart },
}, { timestamps: true });

const CartProduct = mongoose.models[collectionNames.cartProduct] || mongoose.model(collectionNames.cartProduct, CartProductSchema);

export { CartProduct }
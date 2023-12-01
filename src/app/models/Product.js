import mongoose from "mongoose";
import { collectionNames } from "./helpers";

const ProductSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    currency: { type: String, default: 'грн' },
    imageSrc: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: collectionNames.productCategory },
}, {
    timestamps: true
});

const ProductModel = mongoose.models.Product || mongoose.model(collectionNames.product, ProductSchema);

export { ProductModel }
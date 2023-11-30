import mongoose from "mongoose";
import { collectionNames } from "./helpers";

const ProductCategorySchema = mongoose.Schema({
    name: String,
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: collectionNames.product }],
}, {
    timestamps: true
});

const ProductCategoryModel = mongoose.models[collectionNames.productCategory] || mongoose.model(collectionNames.productCategory, ProductCategorySchema);

export { ProductCategoryModel }
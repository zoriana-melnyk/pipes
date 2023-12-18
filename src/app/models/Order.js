import mongoose from 'mongoose';
import { collectionNames } from './helpers';

const OrderSchema = mongoose.Schema(
  {
    name: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: collectionNames.user },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'canceled'],
      default: 'pending',
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: collectionNames.cartProduct,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const OrderModel =
  mongoose.models.Order || mongoose.model(collectionNames.order, OrderSchema);

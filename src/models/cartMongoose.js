import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
      quantity: { type: Number, required: true }
    }
  ]
});
export const CartModel = mongoose.model("Cart", cartSchema)
import mongoose from "mongoose";

const ShopScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    orders: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Shop", ShopScheme);

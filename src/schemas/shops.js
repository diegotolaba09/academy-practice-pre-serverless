import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ShopScheme = new Schema(
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
    users: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
    orders: [
      {
        type: Schema.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Shop", ShopScheme);

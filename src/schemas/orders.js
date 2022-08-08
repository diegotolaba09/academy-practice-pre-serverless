import mongoose from "mongoose";

const { Schema, model } = mongoose;

const OrderScheme = new Schema(
  {
    amount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "success"],
    },
    products: [
      {
        type: Schema.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Order", OrderScheme);

import mongoose from "mongoose";

const OrderScheme = new mongoose.Schema(
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
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Order", OrderScheme);

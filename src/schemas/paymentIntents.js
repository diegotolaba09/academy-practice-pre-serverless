import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PaymentIntentScheme = new Schema(
  {
    amount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "finished", "blocked", "canceled"],
    },
    paymentId: {
      type: Schema.ObjectId,
    },
    attemptsAvailable: {
      type: Number,
      default: 0,
    },
    products: [
      {
        type: Schema.ObjectId,
        ref: "Product",
      },
    ],
    shop: {
      type: Schema.ObjectId,
      ref: "Shop",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("PaymentIntent", PaymentIntentScheme);

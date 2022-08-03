import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProductScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Product", ProductScheme);

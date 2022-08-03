import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserScheme = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "editor", "customer", "guest"],
      required: true,
    },
    locations: {
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      address: {
        type: String,
      },
      code: {
        type: Number,
      },
    },
    paymentLimit: {
      type: Number,
    },
    shop: { type: Schema.ObjectId, ref: "Shop" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("User", UserScheme);

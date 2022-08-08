import mongoose from "mongoose";
import { USER_ROLES } from "../constants/utils.js";

const { Schema, model } = mongoose;
const { ADMIN, EDITOR, CUSTOMER, GUEST } = USER_ROLES;

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
      enum: [ADMIN, EDITOR, CUSTOMER, GUEST],
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
      type: Boolean,
    },
    shop: { type: Schema.ObjectId, ref: "Shop" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("User", UserScheme);

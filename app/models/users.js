const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: Number,
    },
    role: {
      type: String,
      enum: ["admin", "editor", "customer", "guest"],
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
      type: String,
    },
    shop: { type: mongoose.Schema.ObjectId, ref: "Shop" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("User", UserScheme);

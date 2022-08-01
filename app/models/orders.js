const mongoose = require("mongoose");

const OrderScheme = new mongoose.Schema(
  {
    amount: {
      type: Number,
    },
    status: {
      type: String,
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

module.exports = mongoose.model("Order", OrderScheme);

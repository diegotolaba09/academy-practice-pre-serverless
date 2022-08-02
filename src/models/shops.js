const mongoose = require("mongoose");

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
    orders: [{
      type: mongoose.Schema.ObjectId,
      ref: "Order",
    }]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Shop", ShopScheme);

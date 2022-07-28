const mongoose = require("mongoose");

const ShopScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("shops", ShopScheme);

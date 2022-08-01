const express = require("express");
const {
  getProducts,
  createProduct,
  deleteProduct,
} = require("../controllers/products");

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
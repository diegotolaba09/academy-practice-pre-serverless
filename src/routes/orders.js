const express = require("express");
const {
  getOrders,
  createOrder,
  deleteOrder,
} = require("../controllers/orders");

const router = express.Router();

router.get("/", getOrders);

router.post("/", createOrder);

router.delete("/:id", deleteOrder);

module.exports = router;

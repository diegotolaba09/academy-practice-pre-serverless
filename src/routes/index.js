const express = require("express");
const router = express.Router();
const orders = require("./orders");
const products = require("./products");
const shops = require("./shops");
const users = require("./users");

router.use("/orders", orders);
router.use("/products", products);
router.use("/shops", shops);
router.use("/users", users);

module.exports = router;

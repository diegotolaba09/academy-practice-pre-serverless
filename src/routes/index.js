import express from "express";
import orders from "./orders.js";
import products from "./products.js";
import shops from "./shops.js";
import users from "./users.js";

const router = express.Router();

router.use("/orders", orders);
router.use("/products", products);
router.use("/shops", shops);
router.use("/users", users);

export default router;

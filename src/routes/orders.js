import express from "express";
import { getOrders, createOrder, deleteOrder } from "../controllers/orders.js";
import { checkAuth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", checkAuth, getOrders);

router.post("/", checkAuth, createOrder);

router.delete("/:id", checkAuth, deleteOrder);

export default router;

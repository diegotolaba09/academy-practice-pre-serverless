import express from "express";
import { getOrders, createOrder, deleteOrder } from "../controllers/orders.js";

const router = express.Router();

router.get("/", getOrders);

router.post("/", createOrder);

router.delete("/:id", deleteOrder);

export default router;

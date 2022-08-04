import express from "express";
import {
  getShops,
  getShop,
  createShop,
  updateShop,
  deleteShop,
} from "../controllers/shops.js";
import { checkAuth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", checkAuth, getShops);

router.get("/:id", checkAuth, getShop);

router.post("/", checkAuth, createShop);

router.patch("/:id", checkAuth, updateShop);

router.delete("/:id", checkAuth, deleteShop);

export default router;

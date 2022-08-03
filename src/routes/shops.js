import express from "express";
import {
  getShops,
  getShop,
  createShop,
  updateShop,
  deleteShop,
} from "../controllers/shops.js";

const router = express.Router();

router.get("/", getShops);

router.get("/:id", getShop);

router.post("/", createShop);

router.patch("/:id", updateShop);

router.delete("/:id", deleteShop);

export default router;

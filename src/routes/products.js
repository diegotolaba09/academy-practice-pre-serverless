import express from "express";
import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../controllers/products.js";
import { checkAuth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", checkAuth, getProducts);

router.post("/", checkAuth, createProduct);

router.delete("/:id", checkAuth, deleteProduct);

export default router;

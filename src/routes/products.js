import express from "express";
import { USER_ROLES } from "../constants/utils.js";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.js";
import {
  productDTO,
  productCreateDTO,
  productUpdateDTO,
} from "../dto/products.js";
import { checkAuth, checkRole } from "../middlewares/auth.js";

const { ADMIN, EDITOR } = USER_ROLES;

const router = express.Router();

router.get("/", checkAuth, getProducts);

router.get("/:id", checkAuth, productDTO, getProduct);

router.post(
  "/",
  checkAuth,
  checkRole([ADMIN, EDITOR]),
  productCreateDTO,
  createProduct
);

router.patch(
  "/:id",
  checkAuth,
  checkRole([ADMIN, EDITOR]),
  productUpdateDTO,
  updateProduct
);

router.delete(
  "/:id",
  checkAuth,
  checkRole([ADMIN, EDITOR]),
  productDTO,
  deleteProduct
);

export default router;

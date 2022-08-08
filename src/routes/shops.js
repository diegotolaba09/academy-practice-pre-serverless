import express from "express";
import { USER_ROLES } from "../constants/utils.js";
import {
  getShops,
  getShop,
  createShop,
  updateShop,
  deleteShop,
} from "../controllers/shops.js";
import { checkAuth, checkRole } from "../middlewares/auth.js";
import { shopDTO, shopCreateDTO, shopUpdateDTO } from "../dto/shops.js";

const router = express.Router();
const { ADMIN, EDITOR } = USER_ROLES;

router.get("/", checkAuth, checkRole([ADMIN]), getShops);

router.get("/:id", checkAuth, checkRole([ADMIN, EDITOR]), shopDTO, getShop);

router.post("/", checkAuth, checkRole([ADMIN]), shopCreateDTO, createShop);

router.patch(
  "/:id",
  checkAuth,
  checkRole([ADMIN, EDITOR]),
  shopUpdateDTO,
  updateShop
);

router.delete(
  "/:id",
  checkAuth,
  checkRole([ADMIN, EDITOR]),
  shopDTO,
  deleteShop
);

export default router;

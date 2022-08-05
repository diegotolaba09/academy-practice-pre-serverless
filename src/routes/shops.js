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

const router = express.Router();
const { ADMIN } = USER_ROLES;

router.get("/", checkAuth, checkRole([ADMIN]), getShops);

router.get("/:id", checkAuth, checkRole([ADMIN]), getShop);

router.post("/", checkAuth, checkRole([ADMIN]), createShop);

router.patch("/:id", checkAuth, checkRole([ADMIN]), updateShop);

router.delete("/:id", checkAuth, checkRole([ADMIN]), deleteShop);

export default router;

import express from "express";
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orders.js";
import { checkAuth, checkRole } from "../middlewares/auth.js";
import { USER_ROLES } from "../constants/utils.js";
import { orderDTO, orderCreateDTO, orderUpdateDTO } from "../dto/orders.js";

const { ADMIN, CUSTOMER } = USER_ROLES;

const router = express.Router();

router.get("/", checkAuth, checkRole([ADMIN]), getOrders);

router.get("/:id", checkAuth, checkRole([ADMIN, CUSTOMER]), orderDTO, getOrder);

router.post(
  "/",
  checkAuth,
  checkRole([ADMIN, CUSTOMER]),
  orderCreateDTO,
  createOrder
);

router.patch(
  "/:id",
  checkAuth,
  checkRole([ADMIN, CUSTOMER]),
  orderUpdateDTO,
  updateOrder
);

router.delete(
  "/:id",
  checkAuth,
  checkRole([ADMIN, CUSTOMER]),
  orderDTO,
  deleteOrder
);

export default router;

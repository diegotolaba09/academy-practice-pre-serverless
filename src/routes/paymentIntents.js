import express from "express";
import {
  getPaymentIntents,
  getPaymentIntent,
  createPaymentIntent,
  payIntentToPay,
  updatePaymentIntent,
  deletePaymentIntent,
} from "../controllers/paymentIntents.js";
import { checkAuth, checkRole } from "../middlewares/auth.js";
import { USER_ROLES } from "../constants/utils.js";
import {
  paymentIntentDTO,
  paymentIntentCreateDTO,
  paymentIntentUpdateDTO,
  payIntentToPayDTO,
} from "../dto/paymentIntents.js";

const { ADMIN, CUSTOMER, GUEST } = USER_ROLES;

const router = express.Router();

router.get("/", checkAuth, checkRole([ADMIN]), getPaymentIntents);

router.get(
  "/:id",
  checkAuth,
  checkRole([ADMIN, CUSTOMER]),
  paymentIntentDTO,
  getPaymentIntent
);

router.post(
  "/",
  checkAuth,
  checkRole([ADMIN, CUSTOMER]),
  paymentIntentCreateDTO,
  createPaymentIntent
);

router.post(
  "/pay/:id",
  // checkAuth,
  // checkRole([ADMIN, CUSTOMER, GUEST]),
  payIntentToPayDTO,
  payIntentToPay
);

router.patch(
  "/:id",
  checkAuth,
  checkRole([ADMIN, CUSTOMER]),
  paymentIntentUpdateDTO,
  updatePaymentIntent
);

router.delete(
  "/:id",
  checkAuth,
  checkRole([ADMIN, CUSTOMER]),
  paymentIntentDTO,
  deletePaymentIntent
);

export default router;

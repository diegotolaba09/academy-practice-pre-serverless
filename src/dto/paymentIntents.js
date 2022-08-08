import { check, checkSchema } from "express-validator";
import { validateResult } from "../helpers/validateHelpers.js";
import paymentIntents from "../schemas/paymentIntents.js";
import { checkSchemaParamsId } from "./utils.js";

const paymentIntentDTO = [
  ...checkSchemaParamsId("PaymentIntent", paymentIntents),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const paymentIntentCreateDTO = [
  check("amount", "Amount is required")
    .exists()
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage("Amount must be numeric"),
  checkSchema({
    status: {
      in: "body",
      matches: {
        options: [/\b(?:pending|finished|blocked|canceled)\b/],
        errorMessage: "Invalid status",
      },
    },
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const paymentIntentUpdateDTO = [
  ...checkSchemaParamsId("PaymentIntent", paymentIntents),
  ...paymentIntentCreateDTO,
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const payIntentToPayDTO = [
  ...checkSchemaParamsId("PaymentIntent", paymentIntents),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export {
  paymentIntentDTO,
  paymentIntentCreateDTO,
  paymentIntentUpdateDTO,
  payIntentToPayDTO,
};

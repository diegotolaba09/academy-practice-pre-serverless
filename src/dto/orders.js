import { check, checkSchema } from "express-validator";
import { validateResult } from "../helpers/validateHelpers.js";
import orders from "../schemas/orders.js";
import { checkSchemaParamsId } from "./utils.js";

const orderDTO = [
  ...checkSchemaParamsId("Order", orders),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const orderCreateDTO = [
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
        options: [/\b(?:pending|success)\b/],
        errorMessage: "Invalid status",
      },
    },
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const orderUpdateDTO = [
  ...checkSchemaParamsId("Order", orders),
  ...orderCreateDTO,
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export { orderDTO, orderCreateDTO, orderUpdateDTO };

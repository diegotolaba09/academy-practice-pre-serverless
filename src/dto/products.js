import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelpers.js";
import products from "../schemas/products.js";
import { checkSchemaParamsId } from "./utils.js";

const productDTO = [
  ...checkSchemaParamsId("Product", products),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const productCreateDTO = [
  check("name", "Name is required").exists().not().isEmpty().isString(),
  check("description", "Description is required")
    .exists()
    .not()
    .isEmpty()
    .isString(),
  check("price", "Price is required")
    .exists()
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage("Price must be numeric"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const productUpdateDTO = [
  ...checkSchemaParamsId("Product", products),
  ...productCreateDTO,
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export { productDTO, productCreateDTO, productUpdateDTO };

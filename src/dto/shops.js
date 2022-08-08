import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelpers.js";
import shops from "../schemas/shops.js";
import { checkSchemaParamsId } from "./utils.js";

const shopDTO = [
  ...checkSchemaParamsId("Shop", shops),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const shopCreateDTO = [
  check("name", "Name is required").exists().not().isEmpty().isString(),
  check("description", "Description is required")
    .exists()
    .not()
    .isEmpty()
    .isString(),
  check("address", "Address is required").exists().not().isEmpty().isString(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const shopUpdateDTO = [
  ...checkSchemaParamsId("Shop", shops),
  ...shopCreateDTO,
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export { shopDTO, shopCreateDTO, shopUpdateDTO };

import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelpers.js";
import users from "../schemas/users.js";
import { checkSchemaParamsId, createUpdateUser } from "./utils.dto.js";

export const userCreateDTO = [
  ...createUpdateUser,
  check("email", "Email is required")
    .exists()
    .not()
    .isEmpty()
    .isEmail()
    .custom((value) => {
      return users.find({ email: value }).then((user) => {
        if (user?.length) {
          throw new Error("Email already exists");
        }
      });
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const userUpdateDTO = [
  ...createUpdateUser,
  ...checkSchemaParamsId,
  check("email", "Email is required")
    .exists()
    .not()
    .isEmpty()
    .isEmail()
    .custom((value) => {
      return users.find({ email: value }).then((user) => {
        if (!user?.length) {
          throw new Error("Email is required to update");
        }
      });
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const userDeleteDTO = [
  ...checkSchemaParamsId,
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

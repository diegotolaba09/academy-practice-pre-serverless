import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelpers.js";
import users from "../schemas/users.js";
import { createUpdateUser } from "./utils.js";

const authRegisterDTO = [
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

export { authRegisterDTO };

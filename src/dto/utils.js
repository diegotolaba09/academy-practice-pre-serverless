import { check, checkSchema } from "express-validator";
import mongoose from "mongoose";
import { USER_ROLES } from "../constants/utils.js";
import users from "../schemas/users.js";

const { ADMIN, EDITOR } = USER_ROLES;
const { ObjectId } = mongoose.Types;

const checkSchemaParamsId = (title, schema) => [
  checkSchema({
    _id: {
      in: "params",
      custom: {
        options: async (_value, { req }) => {
          const { id } = req.params;
          if (!ObjectId.isValid(id)) {
            throw new Error("ObjectId is invalid");
          }
          const data = await schema.findById(id);
          if (!data) {
            throw new Error(`${title} id not found`);
          }
        },
      },
    },
  }),
];

const createUpdateUser = [
  check("fullName", "Full name is required")
    .exists()
    .not()
    .isEmpty()
    .isString(),
  check("username", "Username is required").exists().not().isEmpty(),
  check("password", "Password is required").exists().not().isEmpty(),
  check("locations.address", "Address is required").exists().not().isEmpty(),
  check("locations.city", "City is required").exists().not().isEmpty(),
  check("locations.country", "Country is required").exists().not().isEmpty(),
  check("locations.code", "Code is required")
    .exists()
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage("Code must be numeric"),
  checkSchema({
    role: {
      in: "body",
      matches: {
        options: [/\b(?:admin|editor|customer|guest)\b/],
        errorMessage: "Invalid role",
      },
      custom: {
        options: async (value, { req }) => {
          const { id } = req.params;
          const user = await users.findById(id);
          if ([ADMIN, EDITOR].includes(value) && user?.role !== ADMIN) {
            throw new Error(
              "The admin is the only one who can change or create a user with the role to admin"
            );
          }
          return value;
        },
      },
    },
  }),
  check("paymentLimit", "Payment limit is required")
    .exists()
    .isBoolean()
    .withMessage("Payment limit must be Boolean"),
];

const isValidObjectId = (id) => {
  return ObjectId.isValid(id);
};

export { checkSchemaParamsId, createUpdateUser, isValidObjectId };

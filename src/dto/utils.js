import { check, checkSchema } from "express-validator";
import { USER_ROLES } from "../constants/utils.js";
import users from "../schemas/users.js";

export const checkSchemaParamsId = [
  checkSchema({
    _id: {
      in: "params",
      custom: {
        options: (_value, { req }) => {
          return users.find({ _id: req.params.id }).then((user) => {
            if (!user?.length) {
              throw new Error("User id not found");
            }
          });
        },
      },
    },
  }),
];

export const createUpdateUser = [
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
          if (value === USER_ROLES.ADMIN && user?.role !== USER_ROLES.ADMIN) {
            throw new Error(
              "The admin is the only one who can change or create a user with the role to admin"
            );
          }
          return value;
        },
      },
    },
  }),
  check("paymentLimit", "Payment limit is required").exists().isNumeric(),
];

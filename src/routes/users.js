import express from "express";
import { USER_ROLES } from "../constants/utils.js";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";
import { userUpdateDTO, userDTO } from "../dto/users.js";
import { checkAuth, checkRole } from "../middlewares/auth.js";

const router = express.Router();
const { ADMIN, EDITOR, CUSTOMER } = USER_ROLES;

router.get("/", checkAuth, checkRole([ADMIN, EDITOR]), getUsers);

router.get(
  "/:id",
  checkAuth,
  checkRole([ADMIN, EDITOR, CUSTOMER]),
  userDTO,
  getUser
);

router.patch(
  "/:id",
  checkAuth,
  checkRole([ADMIN, EDITOR, CUSTOMER]),
  userUpdateDTO,
  updateUser
);

router.delete("/:id", checkAuth, checkRole([ADMIN]), userDTO, deleteUser);

export default router;

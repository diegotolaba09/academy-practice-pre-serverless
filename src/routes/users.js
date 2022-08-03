import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";
import {
  userCreateDTO,
  userUpdateDTO,
  userDeleteDTO,
} from "../dto/users.dto.js";

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", userCreateDTO, createUser);

router.patch("/:id", userUpdateDTO, updateUser);

router.delete("/:id", userDeleteDTO, deleteUser);

export default router;

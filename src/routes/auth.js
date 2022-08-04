import express from "express";
import { login, register } from "../controllers/auth.js";
import { authRegisterDTO } from "../dto/auth.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", authRegisterDTO, register);

export default router;

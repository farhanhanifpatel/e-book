import express from "express";
import { getProfile, login, signup } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.get("/profile", authMiddleware, getProfile);

export default router;

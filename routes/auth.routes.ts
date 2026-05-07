import express from "express";
import {
  getProfile,
  login,
  logout,
  signup,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.get("/profile", authMiddleware, getProfile);

router.post("/logout", logout);

export default router;

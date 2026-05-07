import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateTokens = (userId: string) => {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("JWT secret missing");
  }

  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d", // ⬅️ increase since no refresh token
  });

  return accessToken;
};

export const setCookies = (res: Response, accessToken: string) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 🔥 1 day (increase from 15 min)
    path: "/",
  });
};

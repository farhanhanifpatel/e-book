import jwt from "jsonwebtoken";
import { Response } from "express";

interface CustomJwtPayload {
  userId: string;
  role: string;
}

export const generateToken = (
  userId: string,
  role: string,
  res: Response,
): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const payload: CustomJwtPayload = { userId, role };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return token;
};

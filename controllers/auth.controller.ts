import { NextFunction, Request, Response } from "express";
import { generateTokens, setCookies } from "../utils/token";
import { catchAsync } from "../utils/catchAsync";
import { LoginResponse, SignupResponse, TypedResponse } from "../shared/types";
import { sendError, sendSuccess } from "../shared/responses";
import ValidationRegex from "../shared/validation_regex";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middlewares/auth.middleware";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";

export const login = catchAsync(
  async (
    req: Request<{}, {}, { email: string; password: string }>,
    res: TypedResponse<LoginResponse>,
    next: NextFunction,
  ) => {
    const { email, password } = req.body;

    // 1. Basic validation
    if (!email || !password) {
      return sendError(res, {
        statusCode: 400,
        message: "Email and password are required",
      });
    }

    // 2. Find user
    const user = await User.findOne({ email });

    if (!user) {
      return sendError(res, {
        statusCode: 401,
        message: "Invalid email or password",
      });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return sendError(res, {
        statusCode: 401,
        message: "Invalid email or password",
      });
    }

    // 4. Token
    const accessToken = generateTokens(user._id.toString());

    // 5. Cookie
    setCookies(res, accessToken);

    // 6. Success
    return sendSuccess(res, {
      message: "User logged in successfully",
      data: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        accessToken,
      },
    });
  },
);

export const signup = catchAsync(
  async (
    req: Request<{}, {}, { name: string; email: string; password: string }>,
    res: TypedResponse<SignupResponse>,
    next: NextFunction,
  ) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return sendError(res, {
        statusCode: 400,
        message: "Missing required fields",
      });
    }

    if (!ValidationRegex.isValidEmail(email)) {
      return sendError(res, {
        statusCode: 400,
        message: "Invalid email",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return sendError(res, {
        statusCode: 400,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const accessToken = generateTokens(user._id.toString());

    setCookies(res, accessToken);

    return sendSuccess(res, {
      message: "User registered successfully",
      data: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        accessToken,
      },
    });
  },
);

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const user = await User.findById(userId).select("-password");

    return sendSuccess(res, {
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (error) {
    return sendError(res, {
      statusCode: 401,
      message: "Unauthorized",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken");

    return sendSuccess(res, {
      message: "Logged out successfully",
      data: null,
    });
  } catch (error) {
    return sendError(res, {
      statusCode: 500,
      message: "Logout failed",
    });
  }
};

import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { TypedResponse } from "../shared/types";
import { sendError } from "../shared/responses";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../shared/AppError";

export interface AuthRequest extends Request {
  user: any;
  userId?: string;
}
export const authMiddleware = catchAsync(
  async (req: AuthRequest, res: TypedResponse<null>, next: NextFunction) => {
    const token = req.cookies.accessToken;

    if (!token) {
      return next(new AppError("Unauthorized! Please log in.", 401));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      userId: string;
      role: string;
    };

    if (!decoded.userId) {
      return next(new AppError("Invalid token", 401));
    }

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  },
);

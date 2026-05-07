import { Request, NextFunction } from "express";
import { TypedResponse } from "../shared/types";
import { sendError } from "../shared/responses";
import { AppError } from "../shared/AppError";
export const errorHandling = (
  err: unknown,
  req: Request,
  res: TypedResponse<null>,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";

  if (process.env.NODE_ENV === "development") {
    console.error("Error:", err);
  } else {
    console.error("Error:", (err as AppError).message);
  }

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message || message;
  }
  sendError(res, { statusCode, message, error: err });
};

import { body } from "express-validator";

export const validateCreateBook = [
  body("title").notEmpty().withMessage("Title is required").isString(),
  body("author").notEmpty().withMessage("Author is required").isString(),
];

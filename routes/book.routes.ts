import { createBook, getBooks } from "../controllers/book.controller";
import { validateCreateBook } from "../validators/book.validator";
import { authMiddleware } from "../middlewares/auth.middleware";
import express from "express";
import { upload } from "../middlewares/upload.middleware";
const router = express.Router();

router.get("/", authMiddleware, getBooks);
router.post("/", authMiddleware, upload.single("image"), createBook);

export default router;

import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { sendError, sendSuccess } from "../shared/responses";
import cloudinary from "../config/cloudinary";
import * as streamifier from "streamifier";
// GET /books
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();

    return sendSuccess<typeof books>(res, {
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    return sendError(res, {
      statusCode: 500,
      message: "Failed to fetch books",
    });
  }
};

// POST /books
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author } = req.body;

    if (!title || !author) {
      return sendError(res, {
        statusCode: 400,
        message: "Title and author are required",
      });
    }

    //  Get userId from middleware
    const userId = (req as any).user?.userId;

    let imageUrl = "";
    console.log("REQ.FILE:", req.file);
    if (req.file) {
      console.log("Uploading image...");

      const uploadFromBuffer = (): Promise<string> => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "books" },
            (error, result) => {
              if (error) {
                return reject(error);
              }

              if (!result) {
                return reject(new Error("Upload failed"));
              }
              resolve(result.secure_url);
            },
          );

          const fileBuffer = req.file?.buffer;
          if (!fileBuffer) {
            return reject(new Error("No file buffer available"));
          }
          streamifier.createReadStream(fileBuffer).pipe(stream);
        });
      };

      imageUrl = await uploadFromBuffer();
    }

    const book = await Book.create({
      title,
      author,
      user: userId,
      ...(imageUrl && { image: imageUrl }),
    });

    return sendSuccess(res, {
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    console.error("CREATE BOOK ERROR:", error);
    return sendError(res, {
      statusCode: 500,
      message: "Failed to create book",
    });
  }
};

import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { sendError, sendSuccess } from "../shared/responses";
import cloudinary from "../config/cloudinary";
import * as streamifier from "streamifier";

// GET /books (protected)
export const getBooks = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || "";

    const skip = (page - 1) * limit;

    const filter = search
      ? {
          title: { $regex: search, $options: "i" },
        }
      : {};

    const books = await Book.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Book.countDocuments(filter);

    return sendSuccess(res, {
      message: "Books fetched successfully",
      data: {
        books,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    return sendError(res, {
      statusCode: 500,
      message: "Failed to fetch books",
    });
  }
};

// POST /books (protected)
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author } = req.body;

    if (!title || !author) {
      return sendError(res, {
        statusCode: 400,
        message: "Title and author are required",
      });
    }

    //  FIXED: JWT now uses "id"
    const userId = (req as any).user?.id;

    if (!userId) {
      return sendError(res, {
        statusCode: 401,
        message: "Unauthorized user",
      });
    }

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

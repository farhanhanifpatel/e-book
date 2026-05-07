import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoute from "./routes/auth.routes";
import bookRoute from "./routes/book.routes";
import { connectDB } from "./config/db_config";
import { errorHandling } from "./middlewares/err_handler.middleware";

const app = express();
const PORT = Number(process.env.PORT) || 4000;

/* ---------------- MIDDLEWARES ---------------- */

// Body parser
app.use(express.json());
app.use(cookieParser());

/* ---------------- CORS SETUP ---------------- */

app.use(
  cors({
    origin: ["http://localhost:5173", "https://book-client-self.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

/* ---------------- PRE-FLIGHT FIX (IMPORTANT) ---------------- */

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

/* ---------------- ROUTES ---------------- */

app.use("/api/auth", userRoute);
app.use("/api/books", bookRoute);

/* ---------------- ERROR HANDLER ---------------- */

app.use(errorHandling);

/* ---------------- START SERVER ---------------- */

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("DB Connection failed:", err);
  }
};

startServer();

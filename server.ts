import express from "express";
import "dotenv/config";
import cookieParse from "cookie-parser";
import { errorHandling } from "./middlewares/err_handler.middleware";
import cors from "cors";
import userRoute from "./routes/auth.routes";
import bookRoute from "./routes/book.routes";
import { connectDB } from "./config/db_config";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParse());
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use("/api/auth", userRoute);
app.use("/api/books", bookRoute);

app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

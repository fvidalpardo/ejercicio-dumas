import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";

import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/task.route.js";

// To obtain all environmental variables
dotenv.config();
const app = express();

const PORT = process.env.PORT;
const __dirname = path.resolve();

// To obtain json objets into the request body
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

app.use(globalErrorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB(); // DB innitialization
});

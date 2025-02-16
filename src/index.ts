import express from "express";
import authRouter from "./routes/api";
import db from "./utils/db";
import cors from "cors";

export const app = express();

app.use(cors());
app.use(express.json());

// Koneksi database
export async function connectDB() {
  try {
    const dbResponse = await db();
    console.log("Database connected:", dbResponse);
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Server is running", data: null });
});

app.use("/api/auth", authRouter);

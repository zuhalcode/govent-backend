import express, { Request, Response } from "express";
import serverless from "serverless-http";
import authRouter from "./routes/api";
import db from "./utils/db";

const app = express();
app.use(express.json());

// Koneksi database
async function connectDB() {
  try {
    const dbResponse = await db();
    console.log("Database connected:", dbResponse);
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
connectDB();

// Routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running", data: null });
});
app.use("/api/auth", authRouter);

// Export serverless function
export const handler = serverless(app);

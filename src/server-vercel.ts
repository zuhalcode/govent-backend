import express from "express";
import authRouter from "./routes/api"; // Pastikan path-nya sesuai dengan struktur folder kamu
import db from "./utils/db"; // Pastikan path-nya sesuai dengan struktur folder kamu
import cors from "cors";

const app = express();

// Middleware
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

// Port Vercel will bind to (5000 for local testing, Vercel handles port internally)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

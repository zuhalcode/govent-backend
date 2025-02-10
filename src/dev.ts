import express from "express";
import authRouter from "./routes/api";
import db from "./utils/db";

const app = express();
const PORT = 3000;

app.use(express.json());

// Koneksi database
async function init() {
  try {
    const dbResponse = await db();
    console.log("Database connected:", dbResponse);

    app.get("/", (req, res) => {
      res
        .status(200)
        .json({ message: "Server is running locally", data: null });
    });

    app.use("/api/auth", authRouter);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

init();

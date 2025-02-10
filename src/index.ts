import express from "express";
import authRouter from "./routes/api";
import db from "./utils/db";

const app = express();
app.use(express.json());

async function init() {
  try {
    await db();
    console.log("✅ Database connected, initializing routes...");

    app.get("/", (req, res) => {
      return res.status(200).json({
        message: "Server is running ",
        data: null,
      });
    });

    app.use("/api/auth", authRouter);
  } catch (error) {
    console.error("❌ Failed to initialize server:", error);
  }
}

init();

export default app;

import express from "express";
import authRouter from "./routes/api";
import db from "./utils/db";

async function init() {
  try {
    const dbResponse = await db();
    console.log("Database status : ", dbResponse);

    const app = express();

    const PORT = 3000;

    app.use(express.json());

    app.get("/", (req, res) => {
      return res.status(200).json({
        message: "Server is running",
        data: null,
      });
    });

    app.use("/api/auth", authRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();

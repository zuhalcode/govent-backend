import express from "express";
import router from "./routes/api";
import db from "./utils/db";

async function init() {
  try {
    const dbResponse = await db();
    console.log("Database status : ", dbResponse);

    const app = express();

    const PORT = 3000;

    app.use(express.json());
    app.use("/api", router);

    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (error) {
    console.log(error);
  }
}

init();

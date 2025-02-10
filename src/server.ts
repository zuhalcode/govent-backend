import { app, connectDB } from "./index";
import serverless from "serverless-http";

connectDB();

export const handler = serverless(app);

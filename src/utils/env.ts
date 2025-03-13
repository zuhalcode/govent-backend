import dotenv from "dotenv";

dotenv.config();

export const DATABASE_URL: string = process.env.DATABASE_URL || "";
export const SECRET: string = process.env.SECRET || "";

export const EMAIL_SMTP_USER: string = process.env.EMAIL_SMTP_USER || "";
export const EMAIL_SMTP_PASS: string = process.env.EMAIL_SMTP_PASS || "";

export const CLIENT_HOST: string =
  process.env.CLIENT_HOST || "http://localhost:3001";

export const RESEND_API_KEY: string = process.env.RESEND_API_KEY || "";

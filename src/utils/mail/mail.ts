import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

import {
  EMAIL_SMTP_HOST,
  EMAIL_SMTP_PASS,
  EMAIL_SMTP_PORT,
  EMAIL_SMTP_SERVICE_NAME,
  EMAIL_SMTP_USER,
  RESEND_API_KEY,
  SMTP_SECURE,
} from "../env";
import { Resend } from "resend";

export interface ISendEmail {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const resend = new Resend(RESEND_API_KEY);

export const sendMail = async ({ ...mailParams }: ISendEmail) => {
  const result = await resend.emails.send({
    ...mailParams,
  });

  return result;
};

export const renderMailHTML = async (
  template: string,
  data: any
): Promise<string> => {
  const content = await ejs.renderFile(
    path.join(__dirname, `templates/${template}`),
    data
  );

  return content as string;
};

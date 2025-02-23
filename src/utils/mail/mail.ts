import ejs from "ejs";
import path from "path";

import { RESEND_API_KEY } from "../env";
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

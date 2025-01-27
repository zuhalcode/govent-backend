import bcrypt from "bcrypt";

export const encrypt = async (password: string): Promise<string> => {
  const salt: number = 10;
  const hashedPassword: string = await bcrypt.hash(password, salt);

  return hashedPassword;
};

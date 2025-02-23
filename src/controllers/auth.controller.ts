import { Request, Response } from "express";
import * as Yup from "yup";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import { generateToken, getUserData } from "../utils/jwt";
import { IReqUser } from "../middlewares/auth.middleware";

type TRegister = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type TLogin = {
  identifier: string;
  password: string;
};

const registerValidateSchema = Yup.object({
  fullName: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string()
    .required()
    .min(6, "Password must be at least 6 character")
    .test(
      "at-least-one-uppercase-letter",
      "Password must contains at least one uppercase letter",
      (value) => {
        if (!value) return false;
        const regex = /^(?=.*[A-Z])/;
        return regex.test(value);
      }
    )
    .test(
      "at-least-one-number",
      "Password must contains at least one number",
      (value) => {
        if (!value) return false;
        const regex = /^(?=.*\d)/;
        return regex.test(value);
      }
    ),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Password not match"),
});

export default {
  async register(req: Request, res: Response) {
    const { fullName, username, email, password, confirmPassword } =
      req.body as unknown as TRegister;

    try {
      await registerValidateSchema.validate({
        fullName,
        username,
        email,
        password,
        confirmPassword,
      });

      const user = await UserModel.create({
        fullName,
        username,
        email,
        password,
      });

      return res.status(200).json({
        message: "Registration Success",
        data: user,
      });
    } catch (e) {
      const error = e as unknown as Error;

      res.status(400).json({
        message: error.message,
        data: null,
      });
    }
  },

  async login(req: Request, res: Response) {
    const { identifier, password } = req.body as unknown as TLogin;

    try {
      const userByIdentifier = await UserModel.findOne({
        $or: [{ email: identifier }, { username: identifier }],
        isActive: true,
      });

      if (!userByIdentifier) {
        return res.status(403).json({
          message: "User not found",
          data: null,
        });
      }

      const validatePassword: boolean = await bcrypt.compare(
        password,
        userByIdentifier.password as string
      );

      if (!validatePassword) {
        return res.status(403).json({
          message: "Invalid password",
          data: null,
        });
      }

      const token = generateToken({
        id: userByIdentifier._id,
        role: userByIdentifier.role,
      });

      return res.status(200).json({
        message: "Login Success",
        data: token,
      });
    } catch (e) {
      const error = e as unknown as Error;

      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }
  },

  async me(req: IReqUser, res: Response) {
    try {
      const user = req.user;
      const result = await UserModel.findById(user?.id);

      return res.status(200).json({
        message: "Success get user profile",
        data: result,
      });
    } catch (e) {
      const error = e as unknown as Error;

      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }
  },

  async activation(req: Request, res: Response) {
    try {
      const { code } = req.body as { code: string };

      const user = await UserModel.findOneAndUpdate(
        {
          activationCode: code,
        },
        { isActive: true },
        { new: true }
      );

      return res.status(200).json({
        message: "User activated successfully",
        data: user,
      });
    } catch (e) {
      const error = e as unknown as Error;

      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }
  },
};

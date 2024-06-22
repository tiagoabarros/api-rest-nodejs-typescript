import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { UsersProvider } from "../../database/providers/Users";
import { validation } from "../../shared/middleware";
import { IUser } from "../../database/models";

interface IBodyProps extends Omit<IUser, "id" | "name"> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email().min(5),
    password: yup.string().required().min(6)
  }))
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  
  const { email, password } = req.body;

  const result = await UsersProvider.getByEmail(email);

  if (result instanceof Error) {

    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou Senha são inválidos!"
      }
    });

  }

  if (password !== result.password) {

    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou Senha são inválidos!"
      }
    });

  } else {

    return res.status(StatusCodes.OK).json({ accessToken: "teste.teste.teste" });

  }  
};
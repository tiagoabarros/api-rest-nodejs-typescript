import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middleware";

interface ICities {
  name: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICities>(yup.object().shape({
    name: yup.string().required().min(3)
  }))
}));

export const create = async(req: Request<{}, {}, ICities>, res: Response) => {

  console.log(req.body);
  
  return res.status(StatusCodes.CREATED).json(1);
};
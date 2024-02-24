import { Request, Response } from "express";
import * as yup from "yup";

import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";

interface IParamsProps {
  id: number;
}

interface IBodyProps {
  name: string;
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3)
  })),
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
  }))
}));

export const updateById = async(req: Request, res: Response) => {

  if (Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: {
      default: "Registro não encontrado!"
    }
  });

  return res.status(StatusCodes.NO_CONTENT).send();
};
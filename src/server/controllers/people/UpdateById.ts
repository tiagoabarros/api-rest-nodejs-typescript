import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { IPerson } from "../../database/models";
import { validation } from "../../shared/middleware";
import { PeopleProvider } from "../../database/providers/People";

interface IParamsProps {
  id: number;
}

interface IBodyProps extends Omit<IPerson, "id"> {}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3),
    last_name: yup.string().required().min(3),
    email: yup.string().email().required(),
    city_id: yup.number().integer().required().moreThan(0)
  })),
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
  }))
}));

export const updateById = async (req: Request, res: Response) => {

  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parâmetro 'id' precisa ser informado!"
      }
    });
  }

  const result = await PeopleProvider.updateById(Number(req.params.id), req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();

};
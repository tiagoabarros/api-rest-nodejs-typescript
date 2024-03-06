import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { PeopleProvider } from "../../database/providers/People";
import { validation } from "../../shared/middleware";
import { IPerson } from "../../database/models";

interface IBodyProps extends Omit<IPerson, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3),
    last_name: yup.string().required().min(3),
    email: yup.string().email().required(),
    city_id: yup.number().integer().required().moreThan(0)
  }))
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

  const result = await PeopleProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);

};
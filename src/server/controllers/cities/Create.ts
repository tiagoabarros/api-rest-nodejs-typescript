import { Request, Response } from "express";
import * as yup from "yup";

import { validation } from "../../shared/middleware";

interface ICities {
  name: string;
  state: string;
}

interface IFilter {
  filter?: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICities>(yup.object().shape({
    name: yup.string().required().min(3),
    state: yup.string().required().min(2)
  })),
  query: getSchema<IFilter>(yup.object().shape({
    filter: yup.string().min(3)
  }))
}));

export const create = async(req: Request<{}, {}, ICities>, res: Response) => {

  console.log(req.body);

  return res.send("Created!");
};
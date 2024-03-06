import { Request, Response, json } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { PeopleProvider } from "../../database/providers/People";
import { validation } from "../../shared/middleware";

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({    
    page: yup.number().integer().optional().moreThan(0),
    limit: yup.number().integer().optional().moreThan(0),
    filter: yup.string().optional()
  }))
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

  const result = await PeopleProvider.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || "");
  const count = await PeopleProvider.count(req.query.filter);

  if (result instanceof Error) {

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });

  } else if(count instanceof Error) {

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: count.message
      }
    }); 

  }

  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", count);
  
  return res.status(StatusCodes.OK).json(result);
  
};
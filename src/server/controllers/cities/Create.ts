import { Request, Response } from "express";

interface ICities {
  name: string;
}

export const create = (req: Request<{}, {}, ICities>, res: Response) => {

  const data: ICities = req.body;

  console.log(data);

  return res.send("Created!");
};
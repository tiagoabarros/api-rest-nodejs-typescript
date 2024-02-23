import { Router } from "express";
//import { StatusCodes } from "http-status-codes";

import { CitiesController } from "../controllers";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Olá DEV!");
});

router.post("/cidades", CitiesController.createValidation, CitiesController.create);

export { router };
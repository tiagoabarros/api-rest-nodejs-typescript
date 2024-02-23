import { Router } from "express";

import { CitiesController } from "../controllers";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Olá DEV!");
});

router.get("/cidades", CitiesController.getAllValidation, CitiesController.getAll);
router.post("/cidades", CitiesController.createValidation, CitiesController.create);

export { router };
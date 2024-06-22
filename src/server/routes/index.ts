import { Router } from "express";

import { CitiesController, PeopleController, UsersController } from "../controllers";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Olá DEV!");
});

router.get("/cidades", CitiesController.getAllValidation, CitiesController.getAll);
router.post("/cidades", CitiesController.createValidation, CitiesController.create);
router.get("/cidades/:id", CitiesController.getByIdValidation, CitiesController.getById);
router.put("/cidades/:id", CitiesController.updateByIdValidation, CitiesController.updateById);
router.delete("/cidades/:id", CitiesController.deleteByIdValidation, CitiesController.deleteById);

router.get("/pessoas", PeopleController.getAllValidation, PeopleController.getAll);
router.post("/pessoas", PeopleController.createValidation, PeopleController.create);
router.get("/pessoas/:id", PeopleController.getByIdValidation, PeopleController.getById);
router.put("/pessoas/:id", PeopleController.updateByIdValidation, PeopleController.updateById);
router.delete("/pessoas/:id", PeopleController.deleteByIdValidation, PeopleController.deleteById);

router.post("/entrar", UsersController.signInValidation, UsersController.signIn);
router.post("/cadastrar", UsersController.signUpValidation, UsersController.signUp);

export { router };
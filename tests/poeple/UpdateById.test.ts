import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People Controller - Method UpdateById", () => {

  let city_id: number | undefined = undefined;

  beforeAll(async () => {

    const responseCreateCity = await testServer.post("/cidades").send({"name": "teste"});
    city_id = responseCreateCity.body;

  });

  it("Updating registry successfully", async () => {

    const responseCreate = await testServer.post("/pessoas").send({
      "name": "Maria",
      "last_name": "Barbosa",
      "email": "mariabarbosaa@gmail.com",
      "city_id": city_id
    });

    expect(responseCreate.statusCode).toEqual(StatusCodes.CREATED);

    const responseUpdate = await testServer.put(`/pessoas/${responseCreate.body}`).send({
      "name": "Mariano",
      "last_name": "Souza",
      "email": "marianosouzaa@gmail.com",
      "city_id": city_id
    });

    expect(responseUpdate.statusCode).toEqual(StatusCodes.NO_CONTENT);

  });

  it("Trying to update record with invalid id", async () => {

    const response = await testServer.put("/pessoas/999999").send({
      "name": "Fernando",
      "last_name": "Santos",
      "email": "fernandosantoss@gmail.com",
      "city_id": city_id
    });

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty("errors.default");

  });

});
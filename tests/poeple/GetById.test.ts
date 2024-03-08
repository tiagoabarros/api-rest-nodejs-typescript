import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("People Controller - Method GetById", () => {

  let city_id: number | undefined = undefined;

  beforeAll(async () => {

    const responseCreateCity = await testServer.post("/cidades").send({"name": "teste"});
    city_id = responseCreateCity.body;

  });

  it("Obtaining person registration by id", async () => {

    const responseCreate = await testServer.post("/pessoas").send({
      "name": "Maria",
      "last_name": "Barbosa",
      "email": "mariabarbosaa@gmail.com",
      "city_id": city_id
    });

    expect(responseCreate.statusCode).toEqual(StatusCodes.CREATED);

    const responseGetById = await testServer.get(`/pessoas/${responseCreate.body}`).send();

    expect(responseGetById.statusCode).toEqual(StatusCodes.OK);
    expect(responseGetById.body).toHaveProperty("id");
    expect(responseGetById.body).toHaveProperty("name");
    expect(responseGetById.body).toHaveProperty("last_name");
    expect(responseGetById.body).toHaveProperty("email");
    expect(responseGetById.body).toHaveProperty("city_id");

  });

  it("Trying to obtain registration of person with invalid id", async () => {

    const response = await testServer.get("/pessoas/999999").send();

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty("errors.default");

  });

});
import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("People Controller - Method DeleteById", () => {

  let city_id: number | undefined = undefined;

  beforeAll(async () => {

    const responseCreateCity = await testServer.post("/cidades").send({"name": "teste"});
    city_id = responseCreateCity.body;

  });

  it("Deleting record successfully", async () =>{

    const responseCreate = await testServer.post("/pessoas").send({
      "name": "Maria",
      "last_name": "Barbosa",
      "email": "mariabarbosaaa@gmail.com",
      "city_id": city_id
    });

    expect(responseCreate.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof responseCreate.body).toEqual("number");

    const responseDelete = await testServer.delete(`/pessoas/${responseCreate.body}`).send();

    expect(responseDelete.statusCode).toEqual(StatusCodes.NO_CONTENT);

  });

  it("Trying to delete record with invalid id", async () => {

    const responseCreate = await testServer.post("/pessoas").send({
      "name": "Joana",
      "last_name": "Ferreira",
      "email": "joanaferreiraa@gmail.com",
      "city_id": city_id
    });

    expect(responseCreate.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof responseCreate.body).toEqual("number");

    const responseDelete = await testServer.delete("/pessoas/999999").send();

    expect(responseDelete.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(responseDelete.body).toHaveProperty("errors.default");

  });

});
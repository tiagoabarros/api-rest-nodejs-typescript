import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities Controller - Method GetById", () => {

  it("Returns city record by id", async () => {
    const response = await testServer.post("/cidades").send( {"name": "Maceió"} );

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const getResponse = await testServer.get(`/cidades/${response.body}`).send();

    expect(getResponse.statusCode).toEqual(StatusCodes.OK);
    expect(getResponse.body).toHaveProperty("name");
  });

  it("trying to return non-existent city record", async () => {
    const response = await testServer.get("/cidades/99999").send();

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty("errors.default");
  });
});
import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities Controller - Method UpdateById", () => {

  it("Updating city registration by id", async () => {
    const response = await testServer.post("/cidades").send( {"name": "Maceió"} );

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const updateResponse = await testServer.put(`/cidades/${response.body}`).send( {"name": "Arapiraca"} );

    expect(updateResponse.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Trying to update city registration by id", async () => {
    const response = await testServer.put("/cidades/99999").send( {"name": "Arapiraca"} );

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty("errors.default");
  });
});
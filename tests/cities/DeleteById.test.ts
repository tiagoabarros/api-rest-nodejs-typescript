import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities Controller - Method DeleteById", () => {

  it("Deleting city record", async () => {
    const response = await testServer.post("/cidades").send( {"name": "Maceió"} );

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const deletionResponse = await testServer.delete(`/cidades/${response.body}`).send();

    expect(deletionResponse.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Trying to delete non-existent record", async () => {
    const response = await testServer.delete("/cidades/99999").send();

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty("errors.default");
  });

});
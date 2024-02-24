import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities Controller - Method GetAll", () => {

  it("returning all city records", async () => {
    const insertResponse = await testServer.post("/cidades").send( {"name": "Maceió"} );

    expect(insertResponse.statusCode).toEqual(StatusCodes.CREATED);

    const responseGetAll = await testServer.get("/cidades").send();

    expect(Number(responseGetAll.header["x-total-count"])).toBeGreaterThan(0);
    expect(responseGetAll.statusCode).toEqual(StatusCodes.OK);
    expect(responseGetAll.body.length).toBeGreaterThan(0);
  });

});
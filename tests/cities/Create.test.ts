import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities Controller - Method Create", () => {
  
  it("Insert new city record", async () => {
    const response = await testServer.post("/cidades").send( {"name": "Maceió"} );

    expect(response.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof response.body).toEqual("number");
  });

  it("Name of the new city record cannot be less than 3 characters long", async () => {
    const response = await testServer.post("/cidades").send( {"name": "Ma"} );

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.name");
  });

  it("The name of the new city record cannot be empty", async () =>{
    const response = await testServer.post("/cidades").send( {"name": ""} );

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.name");
  });

});
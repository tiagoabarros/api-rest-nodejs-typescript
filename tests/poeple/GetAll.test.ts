import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People Controller - Method GetAll", () => {

  let city_id: number|undefined = undefined;

  beforeAll(async () => {
    
    const responseCreateCity = await testServer.post("/cidades").send({"name": "teste"});
    city_id = responseCreateCity.body;

  });

  it("Getting all people records", async () => {

    const responseInsert = await testServer.post("/pessoas").send({
      "name": "Tiago",
      "last_name": "Barros",
      "email": "tiagogetall@gmail.com",
      "city_id": city_id
    });

    expect(responseInsert.statusCode).toEqual(StatusCodes.CREATED);

    const responseGetAll = await testServer.get("/pessoas").send();

    expect(Number(responseGetAll.header["x-total-count"])).toBeGreaterThan(0);
    expect(responseGetAll.statusCode).toEqual(StatusCodes.OK);
    expect(responseGetAll.body.length).toBeGreaterThan(0);

  });

});
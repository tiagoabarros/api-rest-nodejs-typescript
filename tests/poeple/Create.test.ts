import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("People Controller - Method Create", () => {

  let city_id: number|undefined = undefined;

  beforeAll(async () => {

    const responseCreateCity = await testServer.post("/cidades").send({"name": "teste"});
    city_id = responseCreateCity.body;

  });
  
  it("Insert new person record", async () => {
    
    const response = await testServer.post("/pessoas").send({
      "name": "Felipe",
      "last_name": "Santos",
      "email": "felipesantoss@gmail.com",
      "city_id": city_id
    });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof response.body).toEqual("number");

  });

  it("Trying to insert a new person record with a duplicate email", async () => {

    const responseCreate = await testServer.post("/pessoas").send({
      "name": "Fernando",
      "last_name": "Souza",
      "email": "fernandosouza@gmail.com",
      "city_id": city_id
    });

    expect(responseCreate.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof responseCreate.body).toEqual("number");

    const responseCreateDuplicate = await testServer.post("/pessoas").send({
      "name": "Fernando",
      "last_name": "Souza",
      "email": "fernandosouza@gmail.com",
      "city_id": city_id
    });

    expect(responseCreateDuplicate.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(responseCreateDuplicate.body).toHaveProperty("errors.default");

  });

  it("Trying to insert new empty record", async () => {

    const response = await testServer.post("/pessoas").send({});

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.name");
    expect(response.body).toHaveProperty("errors.body.last_name");
    expect(response.body).toHaveProperty("errors.body.email");
    expect(response.body).toHaveProperty("errors.body.city_id");

  });

  it("Trying to insert new record with null or empty name attribute", async () => {

    const response = await testServer.post("/pessoas").send({
      "name": "",
      "last_name": "Santos",
      "email": "felipesantoss@gmail.com",
      "city_id": city_id
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.name");

  });

  it("Trying to insert a new record with a name attribute shorter than 3 characters", async () => {

    const response = await testServer.post("/pessoas").send({
      "name": "Fe",
      "last_name": "Santos",
      "email": "felipesantoss@gmail.com",
      "city_id": city_id
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.name");

  });

  it("Trying to insert new record with null or empty last_name attribute", async () => {

    const response = await testServer.post("/pessoas").send({
      "name": "Felipe",
      "last_name": "",
      "email": "felipesantoss@gmail.com",
      "city_id": city_id
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.last_name");

  });

  it("Trying to insert new record with last_name attribute less than 3 characters", async () => {

    const response = await testServer.post("/pessoas").send({
      "name": "Felipe",
      "last_name": "Sa",
      "email": "felipesantoss@gmail.com",
      "city_id": city_id
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.last_name");

  });

  it("Trying to insert new record with null or empty email attribute", async () => {

    const response = await testServer.post("/pessoas").send({
      "name": "Felipe",
      "last_name": "Santos",
      "email": "",
      "city_id": city_id
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.email");
    
  });

  it("Trying to insert new record with invalid email attribute", async () => {

    const response = await testServer.post("/pessoas").send({
      "name": "Felipe",
      "last_name": "Santos",
      "email": "1234567890",
      "city_id": city_id
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.email");

  });

  it("Trying to insert new record with null or empty city_id attribute", async () => {

    const response = await testServer.post("/pessoas").send({
      "name": "Felipe",
      "last_name": "Santos",
      "email": "felipesantoss@gmail.com",
      "city_id": null
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.city_id");

  });

  it("Trying to insert new person record with invalid city_id attribute", async () => {

    const response = await testServer.post("/pessoas").send({
      "name": "Felipe",
      "last_name": "Santos",
      "email": "felipesantos@gmail.com",
      "city_id": "invalid_id"
    });

    console.log(response.body);

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.city_id");

  });

  it("Trying to insert new person record with non-existing city_id attribute", async () => {

    const response = await testServer.post("/pessoas").send({
      "name": "Felipe",
      "last_name": "Santos",
      "email": "felipesantoss@gmail.com",
      "city_id": 99999
    });

    console.log(response.body);

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty("errors.default");

  });

});
import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Users Controller - Method SignUp", () => {

  it("Insert new user record", async () => {
    const response = await testServer.post("/cadastrar").send({
      "name": "Test",
      "email": "test@gmail.com",
      "password": "test123"
    });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof response.body).toEqual("number");
  });

  it("The input name cannot be invalid", async () => {
    const response = await testServer.post("/cadastrar").send({
      "name": "",
      "email": "test@gmail.com",
      "password": "test123"
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.name");
  });

  it("The input email cannot be invalid", async () => {
    const response = await testServer.post("/cadastrar").send({
      "name": "Test",
      "email": "test gmail.com",
      "password": "test123"
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.email");
  });

  it("The input password cannot be invalid", async () => {
    const response = await testServer.post("/cadastrar").send({
      "name": "Test",
      "email": "test@gmail.com",
      "password": ""
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.password");
  });

  it("The input name cannot be shorter than 3 characters", async () => {
    const response = await testServer.post("/cadastrar").send({
      "name": "te",
      "email": "test@gmail.com",
      "password": "test123"
    });
    
    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.name");
  });

  it("The input email cannot be shorter than 5 characters", async () => {
    const response = await testServer.post("/cadastrar").send({
      "name": "test",
      "email": "t.br",
      "password": "test123"
    });
    
    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.email");
  });

  it("The input password cannot be shorter than 6 characters", async () => {
    const response = await testServer.post("/cadastrar").send({
      "name": "test",
      "email": "test@gmail.com",
      "password": "test1"
    });
    
    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.password");
  });

  it("Email cannot be duplicated", async () => {
    const duplicateEmail = await testServer.post("/cadastrar").send({
      "name": "Duplicate",
      "email": "duplicate@gmail.com",
      "password": "duplicate123"
    });

    expect(duplicateEmail.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof duplicateEmail.body).toEqual("number");

    const response = await testServer.post("/cadastrar").send({
      "name": "Test",
      "email": "duplicate@gmail.com",
      "password": "test123"
    });

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty("errors.default");
  });

});
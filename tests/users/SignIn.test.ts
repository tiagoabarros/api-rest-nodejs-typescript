import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Users Controller - Method SignIn", () => {

  beforeAll(async () => {
    const createAccount = await testServer.post("/cadastrar").send({
      "name": "Test",
      "email": "test@gmail.com",
      "password": "test123"
    });
  });

  it("log into existing account", async () =>  {    
    const response = await testServer.post("/entrar").send({
      "email": "test@gmail.com",
      "password": "test123"
    });

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(response.body).toHaveProperty("accessToken");
  });

  it("The input email cannot be invalid", async () => {
    const response = await testServer.post("/entrar").send({
      "email": "test gmail.com",
      "password": "test123"
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.email");
  });

  it("The input email cannot be empty or null", async () => {
    const response = await testServer.post("/entrar").send({
      //"name": "Test",
      "password": "test123"
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.email");
  });

  it("The input password cannot be empty or null", async () => {
    const response = await testServer.post("/entrar").send({
      "name": "Test",
      //"password": "test123"
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.password");
  });

  it("The input password cannot be shorter than 6 characters", async () => {
    const response = await testServer.post("/entrar").send({
      "email": "test@gmail.com",
      "password": "test1"
    });
    
    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors.body.password");
  });

  it("The email cannot be incorrect", async () => {    
    const response = await testServer.post("/entrar").send({
      "email": "testttt@gmail.com",
      "password": "test123"
    });

    expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response.body).toHaveProperty("errors.default");
  });

  it("The password cannot be incorrect", async () => {
    const response = await testServer.post("/entrar").send({
      "email": "test@gmail.com",
      "password": "@test123"
    });

    expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response.body).toHaveProperty("errors.default");
  });
});
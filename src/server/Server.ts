import express, { json } from "express";

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  return res.send("Olá DEV!");
});

export { server };
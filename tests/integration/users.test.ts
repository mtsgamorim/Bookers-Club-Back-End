import supertest from "supertest";
import app from "../../src/app";
import prisma from "../../src/database/prismaClient";
import { userFactory } from "../factory/userFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE book, users`;
});

afterAll(() => {
  prisma.$disconnect;
});

describe("Testes na rota Post: /sign-up", () => {
  it("Caso sucesso: retornar status 201", async () => {
    const user = userFactory();
    const result = await supertest(app).post("/sign-up").send(user);
    expect(result.status).toEqual(201);
  });
  it("Caso erro: Email ja cadastrado, retornar 409", async () => {
    const user = userFactory();
    await supertest(app).post("/sign-up").send(user);
    const result = await supertest(app).post("/sign-up").send(user);
    expect(result.status).toEqual(409);
  });
});

describe("Testes na rota Post: /sign-in", () => {
  it("Caso sucesso: retornar status 200", async () => {
    const user = userFactory();
    await supertest(app).post("/sign-up").send(user);
    const data = {
      email: user.email,
      password: user.password,
    };
    const result = await supertest(app).post("/sign-in").send(data);
    expect(result.status).toEqual(200);
  });

  it("Caso erro: retornar status 401", async () => {
    const user = userFactory();
    const data = {
      email: user.email,
      password: user.password,
    };
    const result = await supertest(app).post("/sign-in").send(data);
    expect(result.status).toEqual(401);
  });
});

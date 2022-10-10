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
});

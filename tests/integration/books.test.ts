import { array } from "joi";
import supertest from "supertest";
import app from "../../src/app";
import prisma from "../../src/database/prismaClient";
import { bookFactory } from "../factory/bookFactory";
import { userFactory } from "../factory/userFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE book, users`;
});

afterAll(() => {
  prisma.$disconnect;
});

async function createToken() {
  const user = userFactory();
  await supertest(app).post("/sign-up").send(user);
  const data = {
    email: user.email,
    password: user.password,
  };
  const result = await supertest(app).post("/sign-in").send(data);
  return result.body.token;
}

async function createBookInDb() {
  const token = await createToken();
  const book = bookFactory();
  const result = await supertest(app)
    .post("/book")
    .send(book)
    .set({ Authorization: `Bearer ${token}` });
  return { token, id: result.body.id, bookId: result.body.bookId };
}

describe("Teste na rota Post book", () => {
  it("Caso sucesso, retornar status 201", async () => {
    const token = await createToken();
    const book = bookFactory();
    const result = await supertest(app)
      .post("/book")
      .send(book)
      .set({ Authorization: `Bearer ${token}` });
    expect(result.status).toEqual(201);
  });
  it("Caso erro, retornar status 401 quando token for invalido", async () => {
    const token = "token";
    const book = bookFactory();
    const result = await supertest(app)
      .post("/book")
      .send(book)
      .set({ Authorization: `Bearer ${token}` });
    expect(result.status).toEqual(401);
  });
});

describe("Teste na rota Get book", () => {
  it("Caso sucesso, retornar status 200 e um array", async () => {
    const token = await createToken();
    const result = await supertest(app)
      .get("/book")
      .send()
      .set({ Authorization: `Bearer ${token}` });
    expect(result.status).toEqual(200);
    expect(result.body).toBeInstanceOf(Array);
  });

  it("Caso erro, token invalido", async () => {
    const token = "token";
    const result = await supertest(app)
      .get("/book")
      .send()
      .set({ Authorization: `Bearer ${token}` });
    expect(result.status).toEqual(401);
  });
});

describe("Teste na rota Patch book", () => {
  it("Caso sucesso, retornar status 201", async () => {
    const bookInfo = await createBookInDb();
    const result = await supertest(app)
      .patch(`/book/${bookInfo.id}`)
      .send()
      .set({ Authorization: `Bearer ${bookInfo.token}` });
    expect(result.status).toEqual(201);
  });

  it("Caso erro, id não existe", async () => {
    const bookInfo = await createBookInDb();
    const result = await supertest(app)
      .patch(`/book/5`)
      .send()
      .set({ Authorization: `Bearer ${bookInfo.token}` });
    expect(result.status).toEqual(400);
  });
});

describe("Teste na rota Delete book", () => {
  it("Caso sucesso, retornar status 200", async () => {
    const bookInfo = await createBookInDb();
    const result = await supertest(app)
      .delete(`/book/${bookInfo.id}`)
      .send()
      .set({ Authorization: `Bearer ${bookInfo.token}` });
    expect(result.status).toEqual(200);
  });
  it("Caso erro, retornar status para user invalido token invalido", async () => {
    const bookInfo = await createBookInDb();
    const tokenInvalido = await createToken();
    const result = await supertest(app)
      .delete(`/book/${bookInfo.id}`)
      .send()
      .set({ Authorization: `Bearer ${tokenInvalido}` });
    expect(result.status).toEqual(401);
  });
});

describe("Teste na rota Get Review", () => {
  it("Teste sucesso, retornar status 200 e um array", async () => {
    const token = await createToken();
    const result = await supertest(app)
      .get(`/reviews`)
      .send()
      .set({ Authorization: `Bearer ${token}` });
    expect(result.status).toEqual(200);
    expect(result.body).toBeInstanceOf(Array);
  });
});

import * as usersServices from "../../src/services/usersServices";
import * as userRepositories from "../../src/repository/usersRepositories";
import { userFactory } from "../factory/userFactory";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("Testes da função createUser", () => {
  it("Teste sucesso", async () => {
    const data = userFactory();
    jest
      .spyOn(userRepositories, "getUserByEmail")
      .mockImplementationOnce((): any => {});
    jest
      .spyOn(userRepositories, "createUser")
      .mockImplementationOnce((): any => {});
    await usersServices.createUser(data);
    expect(userRepositories.getUserByEmail).toBeCalled();
    expect(userRepositories.createUser).toBeCalled();
  });
  it("Teste falha, user ja existe", async () => {
    const data = userFactory();
    jest
      .spyOn(userRepositories, "getUserByEmail")
      .mockImplementationOnce((): any => data);
    jest
      .spyOn(userRepositories, "createUser")
      .mockImplementationOnce((): any => {});
    const result = usersServices.createUser(data);
    expect(result).rejects.toEqual({
      type: "conflict",
      message: "Email ja cadastrado",
    });
  });
});

describe("Testes da função login", () => {
  it("Teste sucesso", async () => {
    const data = userFactory();

    jest
      .spyOn(userRepositories, "getUserByEmail")
      .mockImplementationOnce((): any => data);
    jest.spyOn(bcrypt, "compareSync").mockImplementationOnce((): any => true);
    jest.spyOn(jwt, "sign").mockImplementationOnce((): any => "token");

    const result = await usersServices.login(data.email, data.password);

    expect(result.token).toEqual("token");
  });

  it("Teste erro, email não existe", () => {
    const data = userFactory();
    jest
      .spyOn(userRepositories, "getUserByEmail")
      .mockImplementationOnce((): any => {});

    const result = usersServices.login(data.email, data.password);
    expect(result).rejects.toEqual({
      type: "unauthorized",
      message: "Login ou senha incorretos",
    });
  });

  it("Teste erro, senha incorreta", () => {
    const data = userFactory();
    jest
      .spyOn(userRepositories, "getUserByEmail")
      .mockImplementationOnce((): any => data);
    jest.spyOn(bcrypt, "compareSync").mockImplementationOnce((): any => false);
    const result = usersServices.login(data.email, data.password);
    expect(result).rejects.toEqual({
      type: "unauthorized",
      message: "Login ou senha incorretos",
    });
  });
});

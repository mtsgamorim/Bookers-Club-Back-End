import * as usersServices from "../../src/services/usersServices";
import * as booksServices from "../../src/services/booksServices";
import * as userRepositories from "../../src/repository/usersRepositories";
import * as booksRepositories from "../../src/repository/booksRepositories";
import userFactory from "../factory/userFactory";

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

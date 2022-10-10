import * as booksService from "../../src/services/booksServices";
import * as booksRepositories from "../../src/repository/booksRepositories";
import * as userRepositories from "../../src/repository/usersRepositories";
import jwt from "jsonwebtoken";

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("Teste da função createBook", () => {
  it("Teste sucesso", async () => {
    const data = { id: 1 };
    const title = "Harry Potter";
    const bookId = "FAFAFA";
    const token = "token";
    jest.spyOn(jwt, "verify").mockImplementationOnce((): any => 1);
    jest
      .spyOn(userRepositories, "getUserById")
      .mockImplementationOnce((): any => data);
    jest
      .spyOn(booksRepositories, "createBook")
      .mockImplementationOnce((): any => {});
    await booksService.createBook(bookId, title, token);
    expect(booksRepositories.createBook).toBeCalled();
  });
});

describe("Teste da função getBooks", () => {
  it("Teste sucesso", async () => {
    const data = { id: 1 };
    const token = "token";
    jest.spyOn(jwt, "verify").mockImplementationOnce((): any => 1);
    jest
      .spyOn(userRepositories, "getUserById")
      .mockImplementationOnce((): any => data);
    jest
      .spyOn(booksRepositories, "getBooksByUserId")
      .mockImplementationOnce((): any => []);
    await booksService.getBooks(token);
    expect(booksRepositories.getBooksByUserId).toBeCalled();
  });
});

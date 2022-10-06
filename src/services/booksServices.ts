import jwt from "jsonwebtoken";
import * as usersRepositories from "../repository/usersRepositories";
import * as booksRepositories from "../repository/booksRepositories";

export async function createBook(
  bookId: string,
  title: string,
  image: string,
  token: string
) {
  const id = await verifyTokenReturnId(token);
  if (id === null) {
    throw { type: "unauthorized", message: "Token inválido" };
  }
  const data = {
    bookId,
    title,
    image,
    userId: id,
  };
  try {
    await booksRepositories.createUser(data);
  } catch (error) {
    throw {
      type: "conflict",
      message: "Livro ja registrado para este usuario",
    };
  }
}

export async function getBooks(token: string) {
  const id = await verifyTokenReturnId(token);
  if (id === null) {
    throw { type: "unauthorized", message: "Token inválido" };
  }
  const books = await booksRepositories.getBooksByUserId(id);
  return books;
}

export async function verifyTokenReturnId(token: string) {
  const secret = process.env.JWT_SECRET;
  try {
    const userId: any = jwt.verify(token, secret);
    const user = await usersRepositories.getUserById(userId.id);
    return user.id;
  } catch (error) {
    return null;
  }
}

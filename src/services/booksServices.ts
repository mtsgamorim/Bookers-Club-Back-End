import jwt from "jsonwebtoken";
import * as usersRepositories from "../repository/usersRepositories";
import * as booksRepositories from "../repository/booksRepositories";

export async function createBook(bookId: string, title: string, token: string) {
  const id = await verifyTokenReturnId(token);
  if (id === null) {
    throw { type: "unauthorized", message: "Token inválido" };
  }
  const data = {
    bookId,
    title,
    userId: id,
  };
  try {
    const book = await booksRepositories.createUser(data);
    return book;
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

export async function addReview(token: string, id: number, review: string) {
  const userId = await verifyTokenReturnId(token);
  if (userId === null) {
    throw { type: "unauthorized", message: "Token inválido" };
  }
  const bookInDb = await booksRepositories.getBooksById(id);
  if (!bookInDb) {
    throw {
      type: "badRequest",
      message: "Livro não encontrado",
    };
  }
  if (bookInDb.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "Esse livro não pertence a esse usuario",
    };
  }

  await booksRepositories.createReview(id, review);
}

export async function deleteBook(token: string, id: number) {
  const userId = await verifyTokenReturnId(token);
  if (userId === null) {
    throw { type: "unauthorized", message: "Token inválido" };
  }
  const bookInDb = await booksRepositories.getBooksById(id);
  if (!bookInDb) {
    throw {
      type: "badRequest",
      message: "Livro não encontrado",
    };
  }
  if (bookInDb.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "Esse livro não pertence a esse usuario",
    };
  }

  await booksRepositories.deleteBook(id);
}

export async function getAllBooksWithReview(token: string) {
  const id = await verifyTokenReturnId(token);
  if (id === null) {
    throw { type: "unauthorized", message: "Token inválido" };
  }
  const books = await booksRepositories.getAllBooksWithReview(id);
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

export async function getBookByBookID(token: string, bookID: string) {
  const userId = await verifyTokenReturnId(token);
  if (userId === null) {
    throw { type: "unauthorized", message: "Token inválido" };
  }
  const book = await booksRepositories.getBookByBookID(bookID, userId);
  return book;
}

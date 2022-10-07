import prisma from "../database/prismaClient";
import createBookType from "../types/booksTypes";

export async function createUser(data: createBookType) {
  const book = await prisma.book.create({ data });
  return book;
}

export async function getBooksByUserId(id: number) {
  const books = await prisma.book.findMany({
    where: {
      userId: id,
    },
  });
  return books;
}

export async function getBooksById(id: number) {
  const book = await prisma.book.findFirst({
    where: {
      id: id,
    },
  });
  return book;
}

export async function createReview(id: number, review: string) {
  await prisma.book.update({
    where: {
      id: id,
    },
    data: {
      review: review,
    },
  });
}

export async function deleteBook(id: number) {
  await prisma.book.delete({
    where: {
      id: id,
    },
  });
}

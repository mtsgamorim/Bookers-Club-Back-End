import prisma from "../database/prismaClient";
import createBookType from "../types/booksTypes";

export async function createUser(data: createBookType) {
  await prisma.book.create({ data });
}

export async function getBooksByUserId(id: number) {
  const books = await prisma.book.findMany({
    where: {
      userId: id,
    },
  });
  return books;
}

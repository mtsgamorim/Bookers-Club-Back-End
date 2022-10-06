import prisma from "../database/prismaClient";
import createBookType from "../types/booksTypes";

export async function createUser(data: createBookType) {
  await prisma.book.create({ data });
}

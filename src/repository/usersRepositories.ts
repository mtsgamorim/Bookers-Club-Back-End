import prisma from "../database/prismaClient";
import createUserType from "../types/usersTypes";

export async function getUserByEmail(email: string) {
  const user = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });
  return user;
}

export async function createUser(data: createUserType) {
  await prisma.users.create({ data });
}

export async function getUserById(id: number) {
  const user = await prisma.users.findFirst({
    where: {
      id: id,
    },
  });
  return user;
}

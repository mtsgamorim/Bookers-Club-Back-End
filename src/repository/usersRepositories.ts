import prisma from "../database/prismaClient";
import createUserType from "../types/usersTypes";

export async function getUserById(email: string) {
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

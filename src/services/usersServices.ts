import bcrypt from "bcrypt";
import createUserType from "../types/usersTypes";
import * as userRepositories from "../repository/usersRepositories";

export async function createUser(user: createUserType) {
  await verifyEmailAlreadyExists(user.email);
  const passwordEncrypted = bcrypt.hashSync(user.password, 10);
  const data = {
    email: user.email,
    password: passwordEncrypted,
    name: user.name,
    image: user.image,
  };
  await userRepositories.createUser(data);
}

async function verifyEmailAlreadyExists(email: string) {
  const userInDB = await userRepositories.getUserById(email);
  if (userInDB) {
    throw { type: "conflict", message: "Email ja cadastrado" };
  }
}

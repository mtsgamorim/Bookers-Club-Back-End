import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

export async function login(email: string, password: string) {
  const user = await findUser(email);
  await verifyPassword(password, user.password);
  const token = createToken(user.id);
  const data = {
    token,
    name: user.name,
    image: user.image,
  };
  return data;
}

async function verifyEmailAlreadyExists(email: string) {
  const userInDB = await userRepositories.getUserByEmail(email);
  if (userInDB) {
    throw { type: "conflict", message: "Email ja cadastrado" };
  }
}

async function findUser(email: string) {
  const userInDB = await userRepositories.getUserByEmail(email);
  if (!userInDB) {
    throw { type: "unauthorized", message: "Login ou senha incorreto" };
  }
  return userInDB;
}

async function verifyPassword(password: string, cryptedPassword: string) {
  if (!bcrypt.compareSync(password, cryptedPassword)) {
    throw { type: "unauthorized", message: "Login ou senha incorreto" };
  }
}

function createToken(id: number) {
  const secret = process.env.JWT_SECRET;
  const data = { id };
  const token = jwt.sign(data, secret);
  return token;
}

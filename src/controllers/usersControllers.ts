import { Request, Response } from "express";
import * as usersServices from "../services/usersServices";

export async function createUser(req: Request, res: Response) {
  const data = req.body;
  await usersServices.createUser(data);
  res.sendStatus(201);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const { token, name, image } = await usersServices.login(email, password);
  res.status(200).send({ token, name, image });
}

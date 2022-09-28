import { Request, Response } from "express";
import * as usersServices from "../services/usersServices";

export async function createUser(req: Request, res: Response) {
  const data = req.body;
  await usersServices.createUser(data);
  res.sendStatus(201);
}

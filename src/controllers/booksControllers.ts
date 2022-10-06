import { Request, Response } from "express";
import * as booksServices from "../services/booksServices";

export async function createBook(req: Request, res: Response) {
  const { bookId, title, image } = req.body;
  const token = res.locals.token;
  await booksServices.createBook(bookId, title, image, token);
  res.sendStatus(201);
}

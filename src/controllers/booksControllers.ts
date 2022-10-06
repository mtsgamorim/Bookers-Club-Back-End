import { Request, Response } from "express";
import * as booksServices from "../services/booksServices";

export async function createBook(req: Request, res: Response) {
  const { bookId, title, image } = req.body;
  const token = res.locals.token;
  await booksServices.createBook(bookId, title, image, token);
  res.sendStatus(201);
}

export async function getBooks(req: Request, res: Response) {
  const token = res.locals.token;
  const books = await booksServices.getBooks(token);
  res.status(200).send(books);
}

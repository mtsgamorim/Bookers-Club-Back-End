import { Request, Response } from "express";
import * as booksServices from "../services/booksServices";

export async function createBook(req: Request, res: Response) {
  const { bookId, title, image } = req.body;
  const token = res.locals.token;
  const book = await booksServices.createBook(bookId, title, image, token);
  res.status(201).send(book);
}

export async function getBooks(req: Request, res: Response) {
  const token = res.locals.token;
  const books = await booksServices.getBooks(token);
  res.status(200).send(books);
}

export async function addReview(req: Request, res: Response) {
  const token = res.locals.token;
  const id = Number(req.params.id);
  const { review } = req.body;
  await booksServices.addReview(token, id, review);
  res.sendStatus(201);
}

export async function deleteBook(req: Request, res: Response) {
  const token = res.locals.token;
  const id = Number(req.params.id);
  await booksServices.deleteBook(token, id);
  res.sendStatus(200);
}

export async function getAllBooksWithReview(req: Request, res: Response) {
  const token = res.locals.token;
  const books = await booksServices.getAllBooksWithReview(token);
  res.status(200).send(books);
}

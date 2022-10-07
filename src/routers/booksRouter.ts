import { Router } from "express";
import validateSchema from "../middlewares/schemaValidatorMiddleware";
import createBookSchema from "../schemas/createBookSchema";
import validateTokenExists from "../middlewares/validateTokenExists";
import {
  createBook,
  getBooks,
  addReview,
  deleteBook,
  getAllBooksWithReview,
} from "../controllers/booksControllers";
import validateIdParamMiddleware from "../middlewares/validateIdParamMiddleware";

const router = Router();

router.post(
  "/book",
  validateSchema(createBookSchema),
  validateTokenExists,
  createBook
);
router.get("/book", validateTokenExists, getBooks);
router.patch(
  "/book/:id",
  validateTokenExists,
  validateIdParamMiddleware,
  addReview
);
router.delete(
  "/book/:id",
  validateTokenExists,
  validateIdParamMiddleware,
  deleteBook
);
router.get("/reviews", validateTokenExists, getAllBooksWithReview);

export default router;

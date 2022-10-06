import { Router } from "express";
import validateSchema from "../middlewares/schemaValidatorMiddleware";
import createBookSchema from "../schemas/createBookSchema";
import validateTokenExists from "../middlewares/validateTokenExists";
import { createBook, getBooks } from "../controllers/booksControllers";

const router = Router();

router.post(
  "/book",
  validateSchema(createBookSchema),
  validateTokenExists,
  createBook
);
router.get("/book", validateTokenExists, getBooks);
router.patch("/book");
router.get("/reviews");

export default router;

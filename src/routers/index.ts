import { Router } from "express";
import usersRouter from "./usersRouter";
import booksRouter from "./booksRouter";

const routes = Router();

routes.use(usersRouter);
routes.use(booksRouter);

export default routes;

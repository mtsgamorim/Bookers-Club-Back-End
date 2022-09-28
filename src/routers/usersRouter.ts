import { Router } from "express";
import validateSchema from "../middlewares/schemaValidatorMiddleware";
import userSchema from "../schemas/userSchema";
import { createUser, login } from "../controllers/usersControllers";
import loginSchema from "../schemas/loginSchema";

const router = Router();

router.post("/sign-up", validateSchema(userSchema), createUser);
router.post("/sign-in", validateSchema(loginSchema), login);

export default router;

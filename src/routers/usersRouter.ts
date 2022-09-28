import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator";
import userSchema from "../schemas/userSchema";
import { createUser } from "../controllers/usersControllers";

const router = Router();

router.post("/sign-up", validateSchema(userSchema), createUser);
router.post("/sign-in");

export default router;

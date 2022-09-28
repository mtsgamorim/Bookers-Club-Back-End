import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator";
import userSchema from "../schemas/userSchema";

const router = Router();

router.post("/sign-up");
router.post("/sign-in");

export default router;

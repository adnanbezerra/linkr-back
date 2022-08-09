import { Router } from "express";
import { postSignup } from "../controllers/UserController.js";
import { ValidateEmailRegister } from "../middlewares/ValidateEmailRegister.js";
import { validateSchema } from "../middlewares/ValidateSchema.js";
import RegisterSchema from "../schemas/RegisterSchema.js";

const router = Router();

router.post('/signin');
router.post('/signup', validateSchema(RegisterSchema), ValidateEmailRegister, postSignup);

export default router;
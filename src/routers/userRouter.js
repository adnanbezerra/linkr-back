import { Router } from "express";
import { postSignin, postSignup } from "../controllers/UserController.js";
import { ValidateEmailRegister } from "../middlewares/ValidateEmailRegister.js";
import { ValidateLogin } from "../middlewares/ValidateLogin.js";
import { validateSchema } from "../middlewares/ValidateSchema.js";
import LoginSchema from "../schemas/LoginSchema.js";
import RegisterSchema from "../schemas/RegisterSchema.js";

const router = Router();

router.post('/signin', validateSchema(LoginSchema), ValidateLogin, postSignin);
router.post('/signup', validateSchema(RegisterSchema), ValidateEmailRegister, postSignup);

export default router;
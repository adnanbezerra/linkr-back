import { Router } from "express";
import { getUserByName, getUser, getUserMe, postSignin, postSignup, followOrUnfollowUser } from "../controllers/UserController.js";
import { ValidateEmailRegister } from "../middlewares/ValidateEmailRegister.js";
import { ValidateLogin } from "../middlewares/ValidateLogin.js";
import { validateSchema } from "../middlewares/ValidateSchema.js";
import { validatingToken } from "../middlewares/ValidateToken.js";
import LoginSchema from "../schemas/LoginSchema.js";
import RegisterSchema from "../schemas/RegisterSchema.js";

const router = Router();

router.post('/signin', validateSchema(LoginSchema), ValidateLogin, postSignin);
router.post('/signup', validateSchema(RegisterSchema), ValidateEmailRegister, postSignup);
router.get('/user/:name', validatingToken, getUserByName);
router.get('/user/me', validatingToken, getUserMe);
router.get('/user/:id', validatingToken, getUser);

router.post('/user/:id', validatingToken, followOrUnfollowUser);

export default router;
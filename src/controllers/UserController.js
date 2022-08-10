import { postUser } from "../repository/userRepository.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export async function postSignup(req, res) {
    const newUser = req.body;

    try {
        await postUser(newUser);
        res.sendStatus(201);

    } catch (error) {
        console.error(error);
    }
}

export async function postSignin(req, res) {
    const userId = res.locals.userId;
    const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;
    const jwtKey = process.env.JWT_SECRET;
    const tokenConfig = { expiresIn: ONE_WEEK_IN_SECONDS };

    const userInfo = { id: userId };

    const token = jwt.sign(userInfo, jwtKey, tokenConfig);

    res.cookie('token', token, {maxAge: ONE_WEEK_IN_SECONDS}).sendStatus(200);
}
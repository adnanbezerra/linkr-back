import { getUserById, postUser } from "../repository/userRepository.js";
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

    res.status(200).send(token);
}

export async function getUserMe(req, res) {
    try {
        const id = res.locals.userId;
        const {rows: userRows} = await getUserById(id);

        const {name, email, imageUrl} = userRows[0];
        const user = {name, email, imageUrl}

        res.status(200).send(user);
    } catch (error) {
        console.error(error);
    }
}
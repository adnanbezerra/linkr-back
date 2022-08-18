import { getUserById, getUserFromName, postUser } from "../repository/UserRepository.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function postSignup(req, res) {
    const newUser = req.body;

    try {
        const user = await postUser(newUser);
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
        const { rows: userRows } = await getUserById(id);

        const { name, email, imageUrl } = userRows[0];
        const user = { name, email, imageUrl }

        res.status(200).send(user);
    } catch (error) {
        console.error(error);
    }
}


export async function getUser(req, res) {
    const { id } = req.params;
    const userId = res.locals.userId;
    try {

        const { rows: userRows } = await getUserById(id);
        const { rows: follower } = await getFollower(id, userId);
        console.log(userRows);
        const { name, imageUrl } = userRows[0];
        let user = { name, imageUrl };

        if (follower.length === 0) {
            user = { ...user, following: false }
        }
        else {
            user = { ...user, following: true }
        }

        res.status(200).send(user);
    } catch (error) {
        console.error(error);
    }
}

export async function getUserByName(req, res) {
    try {
        const { name } = req.params;

        // não era exatamente necessário um middleware, só isso
        if (name.length < 3) return res.sendStatus(411);

        const { rows: queryRows } = await getUserFromName(name);

        res.status(200).send(queryRows);

    } catch (error) {
        console.error(error);
    }
}

export async function followOrUnfollowUser(req, res) {
    try {

        const userId = res.locals.userId
        const { id } = req.params

        const { rows: follower } = await getFollower(id, userId);

        if (follower.length === 0) {
            await followUser(Number(id), userId)
        }
        else {
            await unfollowUser(Number(id), userId)
        }

        return res.sendStatus(200)
    }
    catch {
        return res.sendStatus(500)
    }
}
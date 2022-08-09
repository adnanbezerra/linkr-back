import { postUser } from "../repository/userRepository.js";

export async function postSignup(req, res) {
    const newUser = req.body;

    try {
        await postUser(newUser);
        res.sendStatus(201);

    } catch (error) {
        console.error(error);
    }
}
import { getUserFromEmail } from "../repository/userRepository.js";

export async function ValidateEmailRegister(req, res, next) {
    const { email } = req.body;

    try {
        const { rows: emailRows } = await getUserFromEmail(email);

        if(emailRows[0]) return res.sendStatus(409);

        next();
    } catch (error) {
        console.error(error);
    }
}
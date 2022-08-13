import { getUserFromEmail } from "../repository/userRepository.js";
import bcrypt from 'bcrypt';

export async function ValidateLogin(req, res, next) {
    const { email, password } = req.body;

    try {
        const { rows: loginRows } = await getUserFromEmail(email);
        if (!loginRows[0]) return res.sendStatus(401);

        const userFromDatabase = loginRows[0];
        res.locals.userId = userFromDatabase.id;

        if (!bcrypt.compareSync(password, userFromDatabase.password)) return res.status(401).send('erro2');

        next();

    } catch (error) {
        console.error(error);
    }
}
import jwt from 'jsonwebtoken';
import connection from '../database/database.js';
import dotenv from 'dotenv';
dotenv.config();

export async function validatingToken(req, res, next) {

    try {
        const { authorization } = req.headers;
        const token = authorization?.replace("Bearer ", "");
        if (!token) {
            return res.sendStatus(401);
        }
        const data = jwt.verify(token, process.env.JWT_SECRET);
        if (data) {
            const { rows } = await connection.query(`SELECT id FROM users WHERE id = $1`, [data.id]);
            res.locals.userId = rows[0].id;
            next();
        } else {
            return res.status(401).send("Erro ao validar o usuário");
        }
    } catch (error) {
        return res.sendStatus(500);
    }
}

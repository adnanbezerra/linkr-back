import connection from "../database/database.js";
import bcrypt from 'bcrypt';

export async function postUser(newUser) {
    const { name, password, email, imageUrl } = newUser;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    return connection.query(`INSERT INTO users (name, password, email, "imageUrl") VALUES ($1, $2, $3, $4)`, [name, encryptedPassword, email, imageUrl]);
}

export async function getUserFromEmail(email) {
    return connection.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

export async function getUserById(id) {
    return connection.query(`SELECT * FROM users WHERE id=$1`, [id]);
}

export async function getUserFromName(name) {
    return connection.query(`SELECT id, name, "imageUrl" FROM users WHERE name ILIKE $1`, [`${name}%`]);
}
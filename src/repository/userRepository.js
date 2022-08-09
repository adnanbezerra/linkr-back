import connection from "../database/database.js";

export async function postUser(newUser) {
    const {name, password, email, imageUrl} = newUser;

    return connection.query(`INSERT INTO users (name, password, email, "imageUrl") VALUES ($1, $2, $3, $4)`, [name, password, email, imageUrl]);
}

export async function getEmail(email) {
    return connection.query(`SELECT email FROM users WHERE email = $1`, [email]);
}
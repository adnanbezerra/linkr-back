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
    return connection.query(`SELECT id, name, "imageUrl", email FROM users WHERE id=$1`, [id]);
}

// export async function getUserFromName(name) {
//     return connection.query(`SELECT id, name, "imageUrl" FROM users WHERE name ILIKE $1`, [`${name}%`]);
// }

export async function getUserFromName(userId, name) {
    return connection.query(`SELECT u.id, u.name, u."imageUrl" FROM users u
    WHERE LOWER(u.name) ILIKE LOWER($2) AND u.id!=$1 AND u.name NOT IN (SELECT u.name FROM users u
    LEFT JOIN followers f ON f."mainUserId"=u.id
    WHERE f."followerId"=$1)`,
        [userId, name]);
}

export async function getFollowersByName(userId, name) {
    return connection.query(`
        SELECT u.id, u.name, u."imageUrl" FROM users u
        WHERE LOWER(u.name) LIKE LOWER($2) AND u.id!=$1 AND u.name IN (SELECT u.name FROM users u
        LEFT JOIN followers f ON f."mainUserId"=u.id
        WHERE f."followerId"=$1)`,
        [userId, name]);
    // [`${name}%`, userId]);
}

export async function getFollower(id, userId) {
    return connection.query(`
    SELECT * FROM followers f
    WHERE f."mainUserId"=$1 AND f."followerId"=$2`, [id, userId]
    );
}

export async function followUser(id, userId) {
    return connection.query(`
    INSERT INTO followers ("mainUserId","followerId")
    VALUES ($1,$2)`, [id, userId]
    );
}

export async function unfollowUser(id, userId) {
    return connection.query(`
    DELETE FROM followers f
    WHERE f."mainUserId"=$1 AND f."followerId"=$2;`
        , [id, userId]
    );
}
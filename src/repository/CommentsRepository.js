import connection from "../database/database.js";

export async function createNewComment({ postId, userId, commentText }) {
    return connection.query(`INSERT INTO comments ("userId", "commentText", "postId") VALUES ($1, $2, $3)`, [userId, commentText, postId]);
}

export async function getAllTheComments(postId) {
    return connection.query(`
        SELECT comments."userId" as "commenterId", comments."commentText",
        users.name, users.email, users."imageUrl"
        FROM comments 
        JOIN users
        ON users.id=comments."userId"
        WHERE "postId" = $1 
        ORDER BY comments.id`, [postId]);
}
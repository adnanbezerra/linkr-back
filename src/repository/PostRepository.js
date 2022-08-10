import connection from "../database/database.js";


async function getAllPosts() {
    return connection.query(`
        SELECT * 
        FROM posts
        ORDER BY posts."createdAt" DESC`)
}

async function deletePostById(id) {
    return connection.query(
        `
        DELETE FROM posts
        WHERE id = $1
        `, [id]
    )
}

const PostRepository = {
    getAllPosts,
    deletePostById
};

export default PostRepository;
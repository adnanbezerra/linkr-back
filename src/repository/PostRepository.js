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

async function compareUserAndIdPost(userId, idPost){
    return connection.query( `
        SELECT * FROM posts
        WHERE "userId" = $1 AND id = $2
    `, [userId, idPost])
}

const PostRepository = {
    getAllPosts,
    deletePostById,
    compareUserAndIdPost
};

export default PostRepository;
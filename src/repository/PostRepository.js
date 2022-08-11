import connection from "../database/database.js";
// import urlMetadata from 'url-metadata'


async function getAllPosts() {
    return connection.query(`
        SELECT posts.id,posts.url,posts.description,users.name 
        FROM posts
        JOIN users ON users.id=posts."userId"
        ORDER BY posts."createdAt" DESC LIMIT 20`)
}

async function createMyPost(userId, url, description) {
    return connection.query(`
        INSERT INTO posts ("userId",url,description)
        values ($1,$2,$3)`,
        [userId, url, description])
}

async function deletePostById(id) {
    return connection.query(
        `
        DELETE FROM posts
        WHERE id = $1
        `, [id]
    )
}

async function deletePostLikes(id) {
    return connection.query(
        `
        DELETE FROM likes 
        WHERE "postId" = $1
        `, [id]
    )
}

async function deletePostHashtags(id) {
    return connection.query(
        `
        DELETE FROM hashtags_posts
        WHERE "postId" = $1
        `, [id]
    )
}

async function compareUserAndIdPost(userId, idPost){
    return await connection.query( `
        SELECT * FROM posts
        WHERE "userId" = $1 AND id = $2
    `, [userId, idPost])
}

const PostRepository = {
    getAllPosts,
    deletePostById,
    compareUserAndIdPost,
    createMyPost,
    deletePostHashtags,
    deletePostLikes
};

export default PostRepository;
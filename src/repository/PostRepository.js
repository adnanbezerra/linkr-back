import connection from "../database/database.js";
// import urlMetadata from 'url-metadata'


async function getAllPosts() {
    return connection.query(`
    SELECT posts.id,posts.url,posts.description,posts."imagePreview",posts."titlePreview",
        posts."descriptionPreview",users.id AS "userId",users.name,users."imageUrl"
        FROM posts
        JOIN users ON users.id=posts."userId"
        ORDER BY posts."createdAt" DESC LIMIT 20`)
}

async function getPostsbyUser(id) {
    return connection.query(`
    SELECT posts.id,posts.url,posts.description,posts."imagePreview",posts."titlePreview",
        posts."descriptionPreview",users.id AS "userId",users.name,users."imageUrl"
        FROM posts
        JOIN users ON users.id=posts."userId"
        WHERE users.id = $1
        ORDER BY posts."createdAt" DESC`,[id]);
}

async function createMyPost(body) {
    return connection.query(`
    INSERT INTO posts ("userId",url,description,"imagePreview","titlePreview","descriptionPreview")
    values ($1,$2,$3,$4,$5,$6)`,
        [body.userId, body.url, body.description, body.imagePreview, body.titlePreview, body.descriptionPreview])
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

async function compareUserAndIdPost(userId, idPost) {
    return await connection.query(`
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
    deletePostLikes,
    getPostsbyUser
};

export default PostRepository;
import connection from "../database/database.js";
// import urlMetadata from 'url-metadata'


async function getAllPosts(userId) {
    return connection.query(`
    SELECT posts.id,posts.url,posts.description,posts."imagePreview",posts."titlePreview",
    posts."descriptionPreview",u.name,u."imageUrl", 
    CASE WHEN posts."userId" = $1 then 'true' else 'false' end "isMyPost"
    FROM posts
    JOIN users u ON u.id=posts."userId" 
    ORDER BY posts."createdAt" DESC LIMIT 20
    
`, [userId])
}

async function createMyPost(body) {
    return connection.query(`
    INSERT INTO posts ("userId",url,description,"imagePreview","titlePreview","descriptionPreview")
    values ($1,$2,$3,$4,$5,$6) RETURNING id`,
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

async function compareUserAndIdPost(userId, idPost){
    return await connection.query( `
        SELECT * FROM posts
        WHERE "userId" = $1 AND id = $2
    `, [userId, idPost])
}

async function updateDescriptionPost(idPost, message){
    return await connection.query( `
        UPDATE posts SET description = ${`$1`}
        WHERE posts.id = $2
    `, [message, idPost])
}

async function insertTimeline(idPost, userId){
    return await connection.query( `
        INSERT INTO timeline
        ("userId", "postId") VALUES ($1, $2)
    `, [userId, idPost])
}



const PostRepository = {
    getAllPosts,
    deletePostById,
    compareUserAndIdPost,
    createMyPost,
    deletePostHashtags,
    deletePostLikes,
    updateDescriptionPost,
    insertTimeline
};

export default PostRepository;
import connection from "../database/database.js";
// import urlMetadata from 'url-metadata'


async function getAllPosts(userId) {
    return connection.query(`
    SELECT posts.id,posts.url,posts.description,posts."imagePreview",posts."titlePreview",
    posts."descriptionPreview",u.name,u."imageUrl", posts."createdAt",
    CASE WHEN posts."userId" = $1 then 'true' else 'false' end "isMyPost",
	coalesce(NULL) as "isRepost"
    FROM posts
    JOIN users u ON u.id=posts."userId" 
	UNION ALL
	SELECT posts2.id,posts2.url,posts2.description,posts2."imagePreview",posts2."titlePreview",
    posts2."descriptionPreview",u2.name,u2."imageUrl" , reposts."createdAt",
	CASE WHEN posts2."userId" = $1 then 'true' else 'false' end "isMyPost",
	u3.name as "isRepost"
	FROM reposts
	JOIN posts posts2 ON posts2.id = reposts."postId"
	JOIN users u2 ON u2.id = posts2."userId"
	JOIN users u3 ON u3.id = reposts."userId"
	ORDER BY "createdAt" DESC
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

async function insertRepost(idPost, userId){
    return await connection.query( `
        INSERT INTO reposts
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
    updateDescriptionPost
};

export default PostRepository;
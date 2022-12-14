import connection from "../database/database.js";
// import urlMetadata from 'url-metadata'





// async function getAllPosts(userId) {
//     return connection.query(`
//     SELECT posts.id,posts.url,posts.description,posts."imagePreview",posts."titlePreview",
//     posts."descriptionPreview",u.id AS "userId", u.name,u."imageUrl", 
//     CASE WHEN posts."userId" = $1 then 'true' else 'false' end "isMyPost"
//     FROM posts
//     JOIN users u ON u.id=posts."userId" 
//     ORDER BY posts."createdAt" DESC`, [userId])
// }

async function getAllPosts(userId,cut) {
    return connection.query(`
    SELECT posts.id,posts.url,posts.description,posts."imagePreview",posts."titlePreview",
    posts."descriptionPreview",u.name,u."imageUrl", posts."createdAt",
    CASE WHEN posts."userId" = $1 then 'true' else 'false' end "isMyPost",
	coalesce(NULL) as "isRepost",
	posts."userId" as "userId"
    FROM posts
    JOIN users u ON u.id=posts."userId" 
	UNION ALL
	SELECT posts2.id,posts2.url,posts2.description,posts2."imagePreview",posts2."titlePreview",
    posts2."descriptionPreview",u2.name,u2."imageUrl" , reposts."createdAt",
	CASE WHEN posts2."userId" = $1 then 'true' else 'false' end "isMyPost",
	u3.name as "isRepost",
	posts2."userId" as "userId"
	FROM reposts
	JOIN posts posts2 ON posts2.id = reposts."postId"
	JOIN users u2 ON u2.id = posts2."userId"
	JOIN users u3 ON u3.id = reposts."userId"
	ORDER BY "createdAt" DESC OFFSET $2 LIMIT 10`
, [userId,cut])

}
async function getNewPosts(userId, time) {
    return connection.query(`
    SELECT posts.id,posts.url,posts.description,posts."imagePreview",posts."titlePreview",
    posts."descriptionPreview",u.id AS "userId", u.name,u."imageUrl", 
    CASE WHEN posts."userId" = $1 then 'true' else 'false' end "isMyPost"
    FROM posts
    JOIN users u ON u.id=posts."userId"
    WHERE posts."createdAt" > $2
    ORDER BY posts."createdAt" DESC `, [userId, time])

}

async function getPostsbyUser(id,cut) {
    return connection.query(`
    SELECT posts.id,posts.url,posts.description,posts."imagePreview",posts."titlePreview",
        posts."descriptionPreview",users.id AS "userId",users.name,users."imageUrl"
        FROM posts
        JOIN users ON users.id=posts."userId"
        WHERE users.id = $1
        ORDER BY posts."createdAt" DESC OFFSET $2 LIMIT 10`,[id,cut]);
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

async function compareUserAndIdPost(userId, idPost) {
    return await connection.query(`
        SELECT * FROM posts
        WHERE "userId" = $1 AND id = $2
    `, [userId, idPost])
}

async function updateDescriptionPost(idPost, message) {
    return await connection.query(`
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

async function getPostByUserAndHash(userId, url, description) {
    return await connection.query(
        `SELECT * FROM posts
        WHERE posts."userId"=$1 AND posts.url=$2 AND posts.description=$3`, [userId, url, description])
}

async function getHash(arrayHashs) {
    return await connection.query(
        `SELECT * FROM hashtags h
        WHERE h.name=$1`, [arrayHashs]
    )
}

async function insertHash(arrayHashs) {
    return await connection.query(`
    INSERT INTO hashtags (name) VALUES ($1)`, [arrayHashs])
}

async function getPostWithHash(idPost, idHash) {
    return await connection.query(`
    SELECT * FROM hashtags_posts
    WHERE hashtags_posts."postId"=$1 AND hashtags_posts."hashtagId"=$2`, [idPost, idHash])
}

async function insertPostWithHash(idPost, idHash) {
    return await connection.query(`
    INSERT INTO hashtags_posts ("postId","hashtagId") VALUES ($1,$2)`, [idPost, idHash])
}


async function getTimeStamp() {
    return connection.query(`SELECT now() AT TIME ZONE 'UTC6'`);
}


async function getFollowersIds(userId) {
    return await connection.query(`
    SELECT f."mainUserId" FROM followers f
    WHERE f."followerId" = $1`, [userId])
}



const PostRepository = {
    getAllPosts,
    deletePostById,
    compareUserAndIdPost,
    createMyPost,
    deletePostHashtags,
    deletePostLikes,
    getPostsbyUser,
    updateDescriptionPost,
    getPostByUserAndHash,
    getHash,
    insertHash,
    getPostWithHash,
    insertPostWithHash,
    getTimeStamp,
    getNewPosts,
    getFollowersIds
};

export default PostRepository;
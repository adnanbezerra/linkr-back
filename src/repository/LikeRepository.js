import connection from "../database/database.js";

function createLike(postId, userId){
    return connection.query(
    `
    INSERT INTO likes ("likerId", "postId") values ($1, $2)
    ` , [userId, postId]
    )

}

function deleteLike(postId,userId){
    return connection.query(
    `
    DELETE FROM likes WHERE likes."likerId" = $1 and likes."postId" = $2;
    ` , [userId, postId]
    )

}

function infoLikes(postId){
    return connection.query(
    `
    SELECT count(likes."postId") as "totalLikesPost" FROM likes
    WHERE "postId" = $1;
    ` , [postId]
    )

}


function existingPost(idPost) {
    return connection.query( `
     SELECT * FROM posts
     WHERE posts.id = $1 
    `, [idPost])
}

function existingLike(idPost, userId) {
    return connection.query( `
     SELECT * FROM likes
     WHERE likes."postId" = $1 AND likes."likerId" = $2
    `, [idPost, userId])
}


const LikeRepository = {
    createLike,
    deleteLike, 
    infoLikes,
    existingPost,
    existingLike
}

export default LikeRepository;
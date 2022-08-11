import connection from "../database/database.js";

function createLike(userId, postId){
    return connection.query(
    `
    INSERT INTO likes ("likerId", "postId") values ($1, $2)
    ` , [userId, postId]
    )

}

function deleteLike(userId, postId){
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



const LikeRepository = {
    createLike,
    deleteLike, 
    infoLikes
}

export default LikeRepository;
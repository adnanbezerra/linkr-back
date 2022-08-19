import connection from "../database/database.js";

async function insertRepost(idPost, userId){
    return await connection.query( `
        INSERT INTO reposts
        ("userId", "postId") VALUES ($1, $2)
    `, [userId, idPost])
}

async function countRepost(idPost) {
    return await connection.query(`
    SELECT COUNT(reposts."postId") as totalRepost 
    FROM reposts 
    WHERE reposts."postId" = $1
    `, [idPost])
}

const RepostRepository = {
    insertRepost,
    countRepost
};

export default RepostRepository;
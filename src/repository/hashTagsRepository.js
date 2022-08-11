import connection from "../database/database.js";

async function getTagsByPostId(id){
    return connection.query(`SELECT hashtags.name FROM hashtags JOIN hashtags_posts ON hashtags_posts."hashtagId" = hashtags.id JOIN posts ON posts.id = hashtags_posts."postId" WHERE posts.id = $1`,[id]);
}

async function getTrends(){
    return connection.query(`SELECT hashtags.name FROM hashtags LEFT JOIN hashtags_posts ON hashtags_posts."hashtagId" = hashtags.id  LEFT JOIN posts ON posts.id = hashtags_posts."postId" GROUP BY hashtags.name ORDER BY COUNT(posts.id) DESC LIMIT 10`);
}

async function getPostsByTag(tagName){
    return connection.query(`SELECT posts.* FROM hashtags JOIN hashtags_posts ON hashtags_posts."hashtagId" = hashtags.id JOIN posts ON posts.id = hashtags_posts."postId" WHERE hashtags.name = $1`,[tagName]);
}

export const hashTagsRepository = {
    getTagsByPostId,
    getTrends,
    getPostsByTag
}
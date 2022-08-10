import connection from "../database/database.js";


async function getAllPosts() {
    return connection.query(`
        SELECT * 
        FROM posts
        ORDER BY posts."createdAt" DESC`)
}

async function createMyPost(userId, url, description) {
    return connection.query(`
        INSERT INTO posts ("userId",url,description)
        values ($1,$2,$3)`,
        [userId, url, description])
}

const PostRepository = {
    getAllPosts,
    createMyPost
};

export default PostRepository;
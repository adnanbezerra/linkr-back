import connection from "../database/database.js";
import urlMetadata from 'url-metadata'


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


const PostRepository = {
    getAllPosts,
    createMyPost
};

export default PostRepository;
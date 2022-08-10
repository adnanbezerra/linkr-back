import connection from "../database/database.js";


async function getAllPosts() {
    return connection.query(`
        SELECT * 
        FROM posts
        ORDER BY posts."createdAt" DESC`)
}

const PostRepository = {
    getAllPosts
};

export default PostRepository;
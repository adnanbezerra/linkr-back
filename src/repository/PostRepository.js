import connection from "../database/database.js";


async function getAllPosts() {
    return connection.query(`
      SELECT * 
      FROM posts`)
}

const PostRepository = {
    getAllPosts
};

export default PostRepository;
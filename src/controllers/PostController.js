import PostRepository from '../repository/PostRepository.js'
import connection from "../database/database.js";

export async function ShowPosts(req, res) {

    try {

        // const id = 

        const { urlPreview, description } = req.body

        const { rows: allPosts } = await PostRepository.getAllPosts();

        return res.status(201).send(allPosts)
    }
    catch {
        console.log('cheguei')
        return res.send(500)
    }

}
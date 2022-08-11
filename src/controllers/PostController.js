import PostRepository from '../repository/PostRepository.js'

export async function ShowPosts(req, res) {
    try {
        const { rows: allPosts } = await PostRepository.getAllPosts();
        return res.status(201).send(allPosts)
    }
    catch {
        return res.send(500)
    }

}

export async function DeletePost(req, res){
    try{
        const { id } = req.params;
        await PostRepository.deletePostById(id)
        res.sendStatus(200)
    } 
    catch (err){
        console.log(err)
        res.sendStatus(500)
    }

}
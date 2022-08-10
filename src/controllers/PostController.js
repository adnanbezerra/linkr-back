import PostRepository from '../repository/PostRepository.js'

export async function ShowPosts(req, res) {

    try {

        console.log('entrei')

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

export async function CreatePost(req, res) {

    try {

        console.log('entrei')

        const userId = 1

        const { url, description } = req.body

        await PostRepository.createMyPost(userId, url, description);

        return res.send(201)
    }
    catch {
        console.log('deuruim')
        return res.send(500)
    }

}
import PostRepository from '../repository/PostRepository.js'

// import urlMetadata from 'url-metadata'

export async function ShowPosts(req, res) {
    try {

        const { rows: allPosts } = await PostRepository.getAllPosts();

        return res.status(201).send(allPosts)
    }
    catch {
        return res.sendStatus(500)
    }

}

export async function CreatePost(req, res) {

    try {

        const userId = res.locals.userId

        const { url, description } = req.body

        urlMetadata(url).then(
            async function (metadata) { // success handler
                const body = {
                    userId,
                    url,
                    description,
                    imagePreview: metadata.image,
                    titlePreview: metadata.title,
                    descriptionPreview: metadata.description
                }
                // await PostRepository.createMyPost(body);
                return res.send(body)
            },
            function (error) { // failure handler
                return res.send(error)
            })
    }
    catch {
        console.log('deuruim')

        return res.send(500)
    }
}

export async function DeletePost(req, res) {
    try {
        const { idPost } = req.params;
        await PostRepository.deletePostLikes(idPost)
        await PostRepository.deletePostHashtags(idPost)
        await PostRepository.deletePostById(idPost)
        const { rows: allPosts } = await PostRepository.getAllPosts();
        res.status(200).send(allPosts)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}
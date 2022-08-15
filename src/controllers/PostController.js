import PostRepository from '../repository/PostRepository.js'

import urlMetadata from 'url-metadata'

export async function ShowPosts(req, res) {
    try {
        const userId = res.locals.userId
        const { rows: allPosts } = await PostRepository.getAllPosts(userId);

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

        let allDescription = description.split(" ");

        let arrayHashs = []

        allDescription.map((item) => {
            if (item[0] === '#') {
                arrayHashs.push(item)
            }
        })

        urlMetadata(url).then(

            async function (metadata) { // success handler
                const body = {
                    userId: userId,
                    url,
                    description: description,
                    imagePreview: metadata.image,
                    titlePreview: metadata.title,
                    descriptionPreview: metadata.description
                }
                // await PostRepository.createMyPost(body);
                // const { rows: mypost } = await connection.query(
                //     `SELECT * FROM posts
                //     WHERE posts."userId"=$1 AND posts.url=$2`, [userId, url])
                return res.status(201).send(body)
            }
            ,
            function (error) { // failure handler
                return res.send(error)
            }
        )
    }
    catch {

        return res.sendStatus(500)
    }
}


export async function DeletePost(req, res) {
    try {
        const userId = res.locals.userId
        const { idPost } = req.params;
        await PostRepository.deletePostLikes(idPost)
        await PostRepository.deletePostHashtags(idPost)
        await PostRepository.deletePostById(idPost)
        const { rows: allPosts } = await PostRepository.getAllPosts(userId);
        res.status(200).send(allPosts)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function EditPost(req, res) {
    try {
        const userId = res.locals.userId
        const { message } = req.body;
        const { idPost } = req.params;
        await PostRepository.deletePostHashtags(idPost)
        await PostRepository.updateDescriptionPost(idPost, message)
        const { rows: allPosts } = await PostRepository.getAllPosts(userId);
        res.status(201).send(allPosts)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}
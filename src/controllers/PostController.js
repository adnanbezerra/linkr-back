import PostRepository from '../repository/PostRepository.js'

export async function ShowPosts(req, res) {

    console.log('entrei')
    return res.send(200)

    // try {

    //     // const id = 

    //     const { urlPreview, description } = req.body

    //     const { rows: allPosts } = await PostRepository.getAllPosts();

    //     return res.status(201).send(allPosts)
    // }
    // catch {
    //     console.log('cheguei')
    //     return res.send(500)
    // }

}
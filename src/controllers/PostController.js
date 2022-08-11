import PostRepository from '../repository/PostRepository.js'
import connection from '../database/database.js';
import urlMetadata from 'url-metadata'

// urlMetadata('https://www.youtube.com/watch?v=V9iLPwaYgtw').then(
//     function (metadata) { // success handler
//         console.log(metadata)
//     },
//     function (error) { // failure handler
//         console.log(error)
//     })

export async function ShowPosts(req, res) {
    try {
        // const id = 

        const { urlPreview, description } = req.body

        const { rows: allPosts } = await PostRepository.getAllPosts();

        // let completePosts = []

        // Promise.all(
        //     allPosts.map((item) =>
        //         new Promise(async () => await urlMetadata(`${item.url}`).then(
        //             (metadata) => {
        //                 const { image } = metadata
        //                 completePosts.push({ ...item, urlP: image })
        //                 console.log(completePosts)
        //             },
        //             (error) => { console.log(error) }
        //         )
        //         )
        //     )
        // )

        // allPosts.map((item) => {

        //     urlMetadata(`${item.url}`).then(
        //         function (metadata) { // success handler
        //             completePosts.push(metadata.image)
        //         },
        //         function (error) { // failure handler
        //             completePosts.push(error)
        //         })
        // })

        // for (let counter = 0; counter < allPosts.length; counter++) {
        //     urlMetadata(`${allPosts[0].url}`).then(
        //         function (metadata) { // success handler
        //             completePosts.push(metadata.image)
        //         },
        //         function (error) { // failure handler
        //             completePosts.push(error)
        //         })
        // }

        return res.status(201).send(allPosts)
    }
    catch {
        return res.send(500)
    }

}

export async function CreatePost(req, res) {

    try {

        const userId = 1

        const { url, description } = req.body


        // const imagePreview = "/images/branding/googleg/1x/googleg_standard_color_128dp.png"
        // const titlePreview = 'Google'

        // const descriptionPreview = 

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
                await PostRepository.createMyPost(body);
                return res.send(body)
            },
            function (error) { // failure handler
                return res.send(error)
            })

        // return res.send(201)
    }
    catch {
        console.log('deuruim')

        return res.send(500)
    }

}


export async function DeletePost(req, res){
    try{
        const id = req.params.id;
        console.log(id)
        await PostRepository.deletePostLikes(id)
        await PostRepository.deletePostHashtags(id)
        await PostRepository.deletePostById(id)
        res.sendStatus(200)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}
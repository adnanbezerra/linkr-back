import PostRepository from '../repository/PostRepository.js'

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

        await PostRepository.createMyPost(userId, url, description);

        return res.send(201)
    }
    catch {
        console.log('deuruim')
        return res.send(500)
    }

}
import LikeRepository from "../repository/LikeRepository.js";


export async function cancelLike(req, res){
    const userId = res.locals.userId
    const { idPost } = req.params;
    try{
        await LikeRepository.deleteLike(idPost, userId)
        res.sendStatus(200)
    } 
    catch (err){
        console.log(err)
        res.sendStatus(500)
    }
}

export async function Like(req, res){
    const userId = res.locals.userId
    const { idPost } = req.params;

    try{
        await LikeRepository.createLike(idPost, userId)
        res.sendStatus(200)
    } 
    catch (err){
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getInfoLikes(req, res) {
    const userId = res.locals.userId
    const { idPost } = req.params;
    try {
        let liked;
        const userLiked = await LikeRepository.existingLike(idPost, userId)
        if(userLiked.rowCount === 0){ liked = false } else { liked = true }
        const likePost = await LikeRepository.infoLikes(idPost, userId)
        res.status(200).send({ liked, likes: [ ...likePost.rows ], total: likePost.rowCount})
    }  catch (err) {
        res.sendStatus(500)
    }

}
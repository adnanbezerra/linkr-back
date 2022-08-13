import LikeRepository from "../repository/LikeRepository.js";

export async function ValidatePost(req, res, next){
    const { idPost } = req.params;
    try {
        const Post = await LikeRepository.existingPost(idPost)
        if(Post.rowCount === 0) {
            return res.sendStatus(404)
        }
        next();
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function ValidateLikeUser(req, res, next){
    const userId = res.locals.userId
    const { idPost } = req.params;
    try {
        const Like = await LikeRepository.existingLike(idPost, userId)
        if(Like.rowCount === 0) {
            return res.sendStatus(404)
        }
        next();
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function ValidateCreateLike(req, res, next){
    const userId = res.locals.userId
    const { idPost } = req.params;
    try {
        const Like = await LikeRepository.existingLike(idPost, userId)
        if(Like.rowCount === 1) {
            return res.sendStatus(409)
        }
        next();
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}
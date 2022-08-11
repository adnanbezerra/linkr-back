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
    const { idPost } = req.body;
    try{
        await LikeRepository.createLike(idPost, userId)
        res.sendStatus(200)
    } 
    catch (err){
        console.log(err)
        res.sendStatus(500)
    }
}
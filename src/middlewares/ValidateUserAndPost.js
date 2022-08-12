import PostRepository from '../repository/PostRepository.js';

export async function ValidateUserAndPost(req, res, next){
    const userId = res.locals.userId
    const id = req.params.idPost;
    try {
        const compare= await PostRepository.compareUserAndIdPost(userId, id)
        if (compare.rowCount === 0) {
            return res.status(401).send("Você não pode deletar esse post")
        } 
        next();
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}
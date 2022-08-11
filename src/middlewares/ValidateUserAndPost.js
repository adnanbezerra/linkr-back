import PostRepository from '../repository/PostRepository.js';

export async function ValidateUserAndPost(req, res, next){
    const userId = res.locals.userId
    const id = req.params.idPost;
    try {
        const compare = await PostRepository.compareUserAndIdPost(userId, id)
        if (compare.rowCount === 0) {
            return res.sendStatus(404)
        } 
        next();
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}
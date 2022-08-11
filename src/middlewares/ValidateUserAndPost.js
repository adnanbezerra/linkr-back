import PostRepository from '../repository/PostRepository.js';

export async function ValidateUserAndPost(req, res, next){
    const userId = res.locals.userId
    const { id } = req.params.id;
    try {
        const {rowCount: compare} = await PostRepository.compareUserAndIdPost(userId, id)
        if (compare === 0) {
            return res.sendStatus(404)
        } 
        next();
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}
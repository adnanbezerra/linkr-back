import RepostRepository from '../repository/RepostRepository.js'

export async function createRepost(req, res) {
    try {
        const userId = res.locals.userId
        const { idPost } = req.params;
        await RepostRepository.insertRepost(idPost, userId)
        res.sendStatus(201)

    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function countRepost(req, res) {
    try {
        const { idPost } = req.params;
        const count = await RepostRepository.countRepost(idPost)
        res.status(200).send(count.rows)
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }

}

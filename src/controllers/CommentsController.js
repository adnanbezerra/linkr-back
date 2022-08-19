import { createNewComment, getAllTheComments } from "../repository/CommentsRepository.js";
import { getUserById } from "../repository/UserRepository.js";

export async function postComment(req, res) {
    const { postId } = req.params;
    const userId = res.locals.userId;
    const { commentText } = req.body;

    const commentInfo = { postId, userId, commentText };
    try {
        await createNewComment(commentInfo);
        res.sendStatus(201);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function getComments(req, res) {
    const { postId } = req.params;

    try {
        const { rows: commentsRows } = await getAllTheComments(postId);

        res.status(200).send(commentsRows);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

// Support function

async function getCommentWithUserInfo(row) {
    const { contagem, userId, commentText } = row;

    const { rows: userRows } = await getUserById(userId);
    const userInfo = userRows[0];

    const objectResponse = { contagem, commentText, userInfo };

    return objectResponse;
}
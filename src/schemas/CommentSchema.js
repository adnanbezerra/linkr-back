import joi from 'joi';

export const CommentSchema = joi.object({
    commentText: joi.string().trim().required()
});
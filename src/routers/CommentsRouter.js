import { Router } from "express";
import { getComments, postComment } from "../controllers/CommentsController.js";
import { validateSchema } from "../middlewares/ValidateSchema.js";
import { validatingToken } from "../middlewares/ValidateToken.js";
import { CommentSchema } from "../schemas/CommentSchema.js";

const CommentsRouter = Router();

CommentsRouter.post('/comment/:postId', validateSchema(CommentSchema), validatingToken, postComment);
CommentsRouter.get('/comment/:postId', validatingToken, getComments);

export default CommentsRouter;
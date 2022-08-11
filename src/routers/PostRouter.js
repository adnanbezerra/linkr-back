import { Router } from "express";
import { DeletePost, ShowPosts } from "../controllers/PostController.js";
import { validatingToken } from "../middlewares/ValidateToken.js";
import { ValidateUserAndPost } from "../middlewares/ValidateUserAndPost.js";

const postRouter = Router();

postRouter.get('/timeline', ShowPosts)
postRouter.delete('/post/:id', validatingToken, ValidateUserAndPost, DeletePost)

export default postRouter;


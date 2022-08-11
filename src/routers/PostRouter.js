import { Router } from "express";
import { DeletePost, ShowPosts } from "../controllers/PostController.js";

import { ValidateUserAndPost } from "../middlewares/ValidateUserAndPost.js";

const postRouter = Router();

postRouter.get('/timeline', ShowPosts)
postRouter.delete('/post/:id', ValidateUserAndPost, DeletePost)

export default postRouter;


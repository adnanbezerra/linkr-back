import { Router } from "express";
import { DeletePost, ShowPosts } from "../controllers/PostController.js";

const postRouter = Router();

postRouter.get('/timeline', ShowPosts)
postRouter.delete('/post/:id', DeletePost)

export default postRouter;


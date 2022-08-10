import { Router } from "express";
import { CreatePost, ShowPosts } from "../controllers/PostController.js";

const postRouter = Router();

postRouter.get('/timeline', ShowPosts)
postRouter.post('/timeline', CreatePost)

export default postRouter;


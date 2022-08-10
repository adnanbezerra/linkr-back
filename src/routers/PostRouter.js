import { Router } from "express";
import { ShowPosts } from "../controllers/PostController.js";

const postRouter = Router();

postRouter.get('/timeline', ShowPosts)

export default postRouter;


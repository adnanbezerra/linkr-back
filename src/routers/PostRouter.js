import { Router } from "express";
import { DeletePost, ShowPosts } from "../controllers/PostController.js";
import { ValidateLogin } from "../middlewares/ValidateLogin.js";
import { ValidateUserAndPost } from "../middlewares/ValidateUserAndPost.js";

const postRouter = Router();

postRouter.get('/timeline', ShowPosts)
postRouter.delete('/post/:id', ValidateLogin, ValidateUserAndPost, DeletePost)

export default postRouter;


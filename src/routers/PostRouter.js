import { Router } from "express";
import { CreatePost, ShowPosts, DeletePost, gettingPostsByUser } from "../controllers/PostController.js";
import { validateSchema } from "../middlewares/ValidateSchema.js";
import urlSchema from "../schemas/PostSchema.js";
import { validatingToken } from "../middlewares/ValidateToken.js";
import { ValidateUserAndPost } from "../middlewares/ValidateUserAndPost.js";

const postRouter = Router();

postRouter.get('/timeline', ShowPosts);
postRouter.get('/UserPosts/:userId', validatingToken, gettingPostsByUser);
postRouter.post('/timeline', validateSchema(urlSchema),validatingToken, CreatePost)
postRouter.delete('/post/:idPost', validatingToken, ValidateUserAndPost, DeletePost)

export default postRouter;


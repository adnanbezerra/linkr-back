import { Router } from "express";
import { CreatePost, ShowPosts, DeletePost, EditPost } from "../controllers/PostController.js";
import { validateSchema } from "../middlewares/ValidateSchema.js";
import urlSchema from "../schemas/PostSchema.js";
import { validatingToken } from "../middlewares/ValidateToken.js";
import { ValidateUserAndPost } from "../middlewares/ValidateUserAndPost.js";

const postRouter = Router();

postRouter.get('/timeline', validatingToken, ShowPosts)
postRouter.post('/timeline', validateSchema(urlSchema), CreatePost)
postRouter.delete('/post/:idPost', validatingToken, ValidateUserAndPost, DeletePost)
postRouter.patch('/post/:idPost', validatingToken, ValidateUserAndPost, EditPost )

export default postRouter;


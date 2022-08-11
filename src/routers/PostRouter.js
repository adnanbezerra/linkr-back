import { Router } from "express";
import { CreatePost, ShowPosts, DeletePost } from "../controllers/PostController.js";
import { validateSchema } from "../middlewares/ValidateSchema.js";
import urlSchema from "../schemas/PostSchema.js";
import { validatingToken } from "../middlewares/ValidateToken.js";
import { ValidateUserAndPost } from "../middlewares/ValidateUserAndPost.js";

const postRouter = Router();

postRouter.get('/timeline', ShowPosts)
postRouter.post('/timeline', validateSchema(urlSchema), CreatePost)
postRouter.delete('/post/:id', validatingToken, ValidateUserAndPost, DeletePost)

export default postRouter;


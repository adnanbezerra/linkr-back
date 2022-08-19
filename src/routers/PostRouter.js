import { Router } from "express";
import { CreatePost, ShowPosts, DeletePost, gettingPostsByUser, EditPost } from "../controllers/PostController.js";
import { validateSchema } from "../middlewares/ValidateSchema.js";
import urlSchema from "../schemas/PostSchema.js";
import { validatingToken } from "../middlewares/ValidateToken.js";
import { ValidateUserAndPost } from "../middlewares/ValidateUserAndPost.js";
import { currentTime } from "../controllers/PostController.js";

const postRouter = Router();

postRouter.get('/UserPosts/:userId', validatingToken, gettingPostsByUser);
postRouter.post('/timeline', validatingToken, validateSchema(urlSchema), CreatePost);
postRouter.get('/timeline', validatingToken, ShowPosts);
postRouter.delete('/post/:idPost', validatingToken, ValidateUserAndPost, DeletePost);
postRouter.patch('/post/:idPost', validatingToken, ValidateUserAndPost, EditPost );
postRouter.get('/currentTime',validatingToken,currentTime);

export default postRouter;
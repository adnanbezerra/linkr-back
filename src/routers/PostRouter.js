import { Router } from "express";
import { CreatePost, ShowPosts } from "../controllers/PostController.js";
import { validateSchema } from "../middlewares/ValidateSchema.js";
import urlSchema from "../schemas/PostSchema.js";

const postRouter = Router();

postRouter.get('/timeline', ShowPosts)
postRouter.post('/timeline', validateSchema(urlSchema), CreatePost)

export default postRouter;


import { Router } from "express";
import { validatingToken } from "../middlewares/ValidateToken.js";
import { createRepost,  countRepost } from "../controllers/repostController.js";

const repostRouter = Router();


repostRouter.post('/repost/:idPost', validatingToken, createRepost)
repostRouter.get('/repost/:idPost', countRepost)

export default repostRouter;
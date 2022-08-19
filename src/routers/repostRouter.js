import { Router } from "express";
import { validatingToken } from "../middlewares/ValidateToken.js";
import { createRepost } from "../controllers/repostController.js";

const repostRouter = Router();


repostRouter.post('/repost/:idPost', validatingToken, createRepost)

export default repostRouter;
import { Router } from "express";
import { validatingToken } from "../middlewares/ValidateToken.js";
import { Like, cancelLike } from "../controllers/LikeController.js";
import { ValidatePost, ValidateLikeUser, ValidateCreateLike } from "../middlewares/ValidateLike.js";

const likeRouter = Router();

likeRouter.post('/like/:idPost', validatingToken, ValidatePost, ValidateCreateLike, Like);
likeRouter.delete('/like/:idPost', validatingToken, ValidateLikeUser , cancelLike);
likeRouter.get('/likes/:idPost', validatingToken);

export default likeRouter ;
import { Router } from "express";
import { validatingToken } from "../middlewares/ValidateToken.js";
import { Like, cancelLike } from "../controllers/LikeController.js";

const router = Router();

router.post('/like', validatingToken, Like);
router.delete('/like/:postId', validatingToken, cancelLike);
router.get('/likes/:postId', validatingToken);

export default router;
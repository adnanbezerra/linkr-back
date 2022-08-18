import {Router} from 'express';
import userRouter from './userRouter.js';
import PostRouter from './PostRouter.js';
import hashtagsRouters from './hashtagsRouters.js';
import likeRouter from './LikeRouter.js';
import repostRouter from './repostRouter.js';
const router = Router();


// Routers session
router.use(userRouter);

// Routers Posts
router.use(PostRouter);

// Routers hashtags
router.use(hashtagsRouters);

// Routers LIKES
router.use(likeRouter);

// Routers REPOST
router.use(repostRouter);


export default router;
import {Router} from 'express';
import userRouter from './userRouter.js';
import PostRouter from './PostRouter.js';
import hashtagsRouters from './hashtagsRouters.js';

const router = Router();


// Routers session
router.use(userRouter);



// Routers Posts
router.use(PostRouter);


// Routers hashtags
router.use(hashtagsRouters);

export default router;
import {Router} from 'express';
import UserRouter from './UserRouter.js';
import PostRouter from './PostRouter.js';
import hashtagsRouters from './hashtagsRouters.js';
import likeRouter from './LikeRouter.js';
import repostRouter from './repostRouter.js';

import CommentsRouter from './CommentsRouter.js';
const router = Router();


// User Router
router.use(UserRouter);

// Routers REPOST
router.use(repostRouter);

// Posts Router
router.use(PostRouter);

// Hashtags Router
router.use(hashtagsRouters);

// Likes Router
router.use(likeRouter);

// Comments Router
router.use(CommentsRouter);

export default router;
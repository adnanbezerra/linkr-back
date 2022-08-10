import {Router} from 'express';
import hashtagsRouters from './hashtagsRouters.js';

const router = Router();

router.use(hashtagsRouters);

export default router;
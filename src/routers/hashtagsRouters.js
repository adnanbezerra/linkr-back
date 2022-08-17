import { Router } from 'express';
import { getPostsByTag, getTagsByPostId, getTrends } from '../controllers/hashTagsControllers.js';
import { validatingToken } from '../middlewares/ValidateToken.js';


const hashtagsRouters = Router();

hashtagsRouters.get('/hashtags/:postId',validatingToken,getTagsByPostId);
hashtagsRouters.get('/trends',validatingToken, getTrends);
hashtagsRouters.get('/posts/:hashtag',validatingToken, getPostsByTag);//mover para rotas de posts depois

export default hashtagsRouters;
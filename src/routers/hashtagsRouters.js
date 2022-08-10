import { Router } from 'express';
import { getTagsByPostId, getTrends } from '../controllers/hashTagsControllers.js';

const hashtagsRouters = Router();

//adicionar validação de usuário depois

hashtagsRouters.get('/hashtags/:postId', getTagsByPostId);
hashtagsRouters.get('/trends', getTrends);
//hashtagsRouters.get('/posts/:hashtagId');//mover para rotas de posts depois

export default hashtagsRouters;
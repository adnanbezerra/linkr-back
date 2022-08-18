import { Router } from "express";
import { validatingToken } from "../middlewares/ValidateToken.js";

const repostRouter = Router();


repostRouter.post('/repost', validatingToken, )
repostRouter.get('/repost', validatingToken, )

export default repostRouter;
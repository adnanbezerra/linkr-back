import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';

dotenv.config();

const PORT = process.env.PORT;

const server = express();
server.use(cors());
server.use(express.json());
server.use(cookieParser());


server.use(router);

server.listen(PORT, () => {
    console.log(`It's alive on port ${PORT}`);
})
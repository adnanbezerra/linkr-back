import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routers/router.js';

dotenv.config();



const server = express();
server.use(cors());
server.use(express.json());

// Routers session
server.use(router)

server.listen(process.env.PORT, () => {
    console.log("It's alive!");
})
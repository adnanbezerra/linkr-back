import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import PostRouter from './routers/PostRouter.js'

dotenv.config();

// const PORT = process.env.PORT;
const PORT = 5000;

const server = express();
server.use(cors());
server.use(express.json());

// Routers session
// server.use()



// Routers Posts
server.use(PostRouter)

server.listen(PORT, () => {
    console.log("It's alive! port:" + PORT);
})
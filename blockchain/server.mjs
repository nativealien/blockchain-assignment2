import express from 'express';
import dotenv from 'dotenv';

import Blockchain from './models/Blockchain.mjs';
import { blockRouter, chainRouter } from './routes/routes.mjs';

dotenv.config({ path: './config/config.env' });

export const blockchain = new Blockchain()

const app = express()

app.use(express.json())

app.use('/api/v2/blockchain', chainRouter)
app.use('/api/v2/block', blockRouter)

const PORT = process.env.MAIN_NODE ? process.env.MAIN_PORT : Math.floor(Math.random() * 999) + 5001;

app.listen(PORT, () => console.log(`Node running on port ${PORT}`) )
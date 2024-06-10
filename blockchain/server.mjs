import express from 'express';
import cors from 'cors';

import PubNubServer from './models/PubNubServer.mjs';
import { blockRouter, chainRouter } from './routes/routes.mjs';

export const pubnub = new PubNubServer()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v2/blockchain', chainRouter)
app.use('/api/v2/block', blockRouter)

const PORT = process.env.MAIN_NODE ? process.env.MAIN_PORT : Math.floor(Math.random() * 999) + 5001;

app.listen(PORT, () => console.log(`Node running on port ${PORT}`) )
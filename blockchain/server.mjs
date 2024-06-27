import express from 'express';
import cors from 'cors';
import { setFolderPath } from './utils/files-utils.mjs';
global.__appdir = setFolderPath(import.meta.url)

import PubNubServer from './models/PubNubServer.mjs';
import { blockRouter, chainRouter, cryptoRouter } from './routes/routes.mjs';
import { handleError, handleUndefined, loggEvent } from './middle/handle-events.mjs';

export const pubnub = new PubNubServer()

const app = express()

app.use(express.json())
app.use(cors())
app.use( loggEvent )

app.use('/api/v2/blockchain', chainRouter)
app.use('/api/v2/block', blockRouter)
app.use('/api/v2/crypto', cryptoRouter)

app.all('*', handleUndefined )
app.use( handleError )

const PORT = process.env.MAIN_NODE ? process.env.MAIN_PORT : Math.floor(Math.random() * 999) + 5001;

app.listen(PORT, () => console.log(`Node running on port ${PORT}`) )
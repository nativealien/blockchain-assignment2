import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import colors from 'colors'
import dotenv from 'dotenv'
dotenv.config()

import { setFolderPath } from './utils/files-utils.mjs';
global.__appdir = setFolderPath(import.meta.url)

import PubNubServer from './models/PubNubServer.mjs';
import { chainRouter, cryptoRouter, memberRouter } from './routes/routes.mjs';
import { handleError, handleUndefined, loggEvent } from './middle/handle-events.mjs';

import { connectDb } from './config/mongodb.mjs';
connectDb()

export const pubnub = new PubNubServer()

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use( loggEvent )

app.use('/api/v2/blockchain', chainRouter)
app.use('/api/v2/crypto', cryptoRouter)
app.use('/api/v2/members', memberRouter)

app.all('*', handleUndefined )
app.use( handleError )

const PORT = process.env.MAIN_NODE === 'true' ? process.env.MAIN_PORT : process.argv[2]// Math.floor(Math.random() * 999) + 5001;

app.listen(PORT, () => console.log(`Node running on port ${PORT}`.green.bgGreen) )
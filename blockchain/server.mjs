import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import colors from 'colors'
import dotenv from 'dotenv'
dotenv.config()

import { setFolderPath } from './utils/files-utils.mjs';
global.__appdir = setFolderPath(import.meta.url)

import PubNubServer from './models/PubNubServer.mjs';
import Blockchain from './models/Blockchain.mjs';
import TransactionPool from './models/TransactionPool.mjs';
import Wallet from './models/Wallet.mjs';
import { blockRouter, chainRouter, cryptoRouter } from './routes/routes.mjs';
import { handleError, handleUndefined, loggEvent } from './middle/handle-events.mjs';

import { connectDb } from './config/mongodb.mjs';
connectDb()

const blockchain = new Blockchain()
const pool = new TransactionPool()
const wallet = new Wallet()
export const pubnub = new PubNubServer(blockchain, pool, wallet)

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use( loggEvent )

app.use('/api/v2/blockchain', chainRouter)
app.use('/api/v2/block', blockRouter)
app.use('/api/v2/crypto', cryptoRouter)

app.all('*', handleUndefined )
app.use( handleError )

const PORT = process.env.MAIN_NODE === 'true' ? process.env.MAIN_PORT : process.argv[2]// Math.floor(Math.random() * 999) + 5001;

app.listen(PORT, () => console.log(`Node running on port ${PORT}`.green.bgGreen) )
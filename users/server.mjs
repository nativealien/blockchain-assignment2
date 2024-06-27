import express from 'express'
import morgan from 'morgan';
import colors from 'colors'
import dotenv from 'dotenv'
dotenv.config({ path: './config/config.env'})

import { authRouter } from './routes/routes.mjs';

import { connectDb } from './config/mongodb.mjs'

import { setFolderPath } from './utils/files-utils.mjs';
global.__appdir = setFolderPath(import.meta.url)

connectDb()

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth', authRouter)

const PORT = process.env.PORT || 5001

const server = app.listen(PORT, () => console.log(`Server listens to port ${PORT}`.yellow))

process.on('unhandledRejection', (err, promise) => {
    console.log(`FEL: ${err.message}`.red);
    server.close(() => process.exit(1));
  });




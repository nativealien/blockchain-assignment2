import express from 'express'
import morgan from 'morgan';
import colors from 'colors'

import helmet from 'helmet'
import xss from 'xss-clean'
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import cors from 'cors'

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

app.use(helmet({ contentSecurityPolicy: false }));
app.use(xss());
const limit = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minuters fönster
    limit: 100
});
app.use(cors())
app.use(hpp());

app.use('/api/v1/auth', authRouter)

const PORT = process.env.PORT || 4001

const server = app.listen(PORT, () => console.log(`Server listens to port ${PORT}`.yellow))

process.on('unhandledRejection', (err, promise) => {
    console.log(`FEL: ${err.message}`.red);
    server.close(() => process.exit(1));
  });




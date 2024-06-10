import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });

const app = express()

app.use(express.json())

app.use('api/v2/blockchain', () => console.log("HAJ"))

const PORT = process.env.MAIN_NODE ? process.env.MAIN_PORT : Math.floor(Math.random() * 999) + 5001;

app.listen(PORT, () => console.log(`Node running on port ${PORT}`) )
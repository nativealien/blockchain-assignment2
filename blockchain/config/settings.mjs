import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });

export const SETTINGS = {
    MINE_RATE: 3000,
    INIT_BALANCE: 100,
    REWARD_ADDRESS: { address: 'temp'},
    MINE_REWARD: 50
}

export const GENESIS_DATA = {
    timestamp: 1,
    preHash: '0',
    hash: '0',
    diff: 3,
    nonce: 0,
    data: []
}

export const PUBNUB_CREDENTALS = {
    publishKey: process.env.PUBLISH_KEY,
    subscribeKey: process.env.SUBSCRIBE_KEY,
    secretKey: process.env.SECRET_KEY,
    userId: "Oskar"
}

export const CHANNELS = [
    'Blockchain'
]

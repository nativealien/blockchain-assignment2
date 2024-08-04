import Response from "../models/Response.mjs";
import Miner from "../models/Miner.mjs";
import { pubnub } from "../server.mjs";

export const getPool = (req, res, next) => {
    res.status(200).json(Response.get(null, pubnub.pool.transactions))
}

export const getWallet = (req, res, next) => {
    res.status(200).json(Response.get(null, { key: pubnub.wallet.publicKey, balance: pubnub.wallet.balance}))
}

export const sendTransaction = async (req, res, next) => {
    const { receiver, amount } = req.body 
    const test = await pubnub.makeTransaction(receiver, amount)
    res.status(201).json(Response.post(null, {test}))
}

export const mineTransactions = (req, res, next) => {
    const miner = new Miner({
        blockchain: pubnub.blockchain,
        pool: pubnub.pool,
        wallet: pubnub.wallet
    })
    const test = miner.mine()
    console.log(test)

    res.status(201).json(Response.get(null, {data: test}))
}




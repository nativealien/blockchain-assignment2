import Response from "../models/Response.mjs";
import { pubnub } from "../server.mjs";

export const getPool = (req, res, next) => {
    res.status(200).json(Response.get(null, pubnub.pool.transactions))
}

export const getWallet = (req, res, next) => {
    res.status(200).json(Response.get(null, { key: pubnub.wallet.publicKey, balance: pubnub.wallet.balance}))
}

export const sendTransaction = (req, res, next) => {
    const { receiver, amount } = req.body 
    const test = pubnub.makeTransaction(receiver, amount)
    res.status(201).json(Response.post(null, {}))
}



export const mineTransactions = (req, res, next) => {
    res.status(201).json(Response.get(null, {data: 'Mining complete'}))
}

export const getTransaction = (req, res, next) => {
    res.status(200).json(Response.get(null, {data: 'Get Transaction by ID'}))
}



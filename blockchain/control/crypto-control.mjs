import Response from "../models/Response.mjs";
import { pubnub } from "../server.mjs";

export const getPool = (req, res, next) => {
    console.log('TEST')
    res.status(200).json(Response.get(null, pubnub.pool.transactions))
}

export const getWallet = (req, res, next) => {
    const holder = req.body.name
    const wallet = pubnub.wallets.filter( wallet => wallet.holder === holder)[0]
    if(wallet) res.status(200).json(Response.get(null, {holder: wallet.holder, publicKey: wallet.publicKey, balance: wallet.balance}))
    else res.status(200).json(Response.error(404, 'Wallet not found...'))
}
export const sendTransaction = (req, res, next) => {
    const { sender, receiver, amount } = req.body

    let transaction = pubnub.pool.checkTransaction({
        address: sender.publicKey
    })

    res.status(201).json(Response.get(null, {data: 'Send Transaction'}))
}

export const getTransaction = (req, res, next) => {
    res.status(200).json(Response.get(null, {data: 'Get Transaction by ID'}))
}


export const mineTransactions = (req, res, next) => {
    res.status(201).json(Response.get(null, {data: 'Mining complete'}))
}
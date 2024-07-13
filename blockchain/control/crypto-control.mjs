import Response from "../models/Response.mjs";
import { pubnub } from "../server.mjs";

export const getPool = (req, res, next) => {
    res.status(200).json(Response.get(null, pubnub.pool.transactions))
}

export const getWallet = (req, res, next) => {
    const holder = req.body.publicKey
    const wallet = pubnub.wallets.filter( wallet => wallet.holder === holder)[0]
    if(wallet) res.status(200).json(Response.get(null, {holder: wallet.holder, publicKey: wallet.publicKey, balance: wallet.balance}))
    else res.status(200).json(Response.error(404, 'Wallet not found...'))
}
export const sendTransaction = (req, res, next) => {
    const { receiver, amount } = req.body

    const transaction = pubnub.wallet.transaction({ receiver, amount })
    const transactions = pubnub.pool.addTransaction(transaction)

    const length = Object.values(transactions).length
    console.log('PRE Length', length)
    if(length >= 2){
        pubnub.blockchain.newBlock({data: transactions})
        pubnub.broadcast('Blockchain', pubnub.blockchain.chain)
    }else{
        pubnub.broadcast('Transaction', { output: transaction.output, pool: transactions } )
    }

    res.status(201).json({message: transaction})
}

export const mineTransactions = (req, res, next) => {
    res.status(201).json(Response.get(null, {data: 'Mining complete'}))
}

export const getTransaction = (req, res, next) => {
    res.status(200).json(Response.get(null, {data: 'Get Transaction by ID'}))
}



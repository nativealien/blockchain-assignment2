import express from 'express'
import { getChain } from '../control/chain-control.mjs'
import { postMember } from '../control/member-control.mjs'
import { getPool, getWallet, getTransaction, sendTransaction } from '../control/crypto-control.mjs'

const chainRouter = express.Router()
chainRouter.get('/', getChain)

const cryptoRouter = express.Router()
cryptoRouter.get('/', getPool)
cryptoRouter.get('/wallet', getWallet)
cryptoRouter.get('/transaction:id', getTransaction)
cryptoRouter.post('/transaction', sendTransaction)

const memberRouter = express.Router()
memberRouter.post('/new', postMember)

export { chainRouter, cryptoRouter, memberRouter }

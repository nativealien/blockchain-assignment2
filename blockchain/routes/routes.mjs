import express from 'express'
import { mineBlock } from '../control/block-control.mjs'
import { getChain } from '../control/chain-control.mjs'
import { postMember } from '../control/member-control.mjs'
import { getPool, getWallet, getTransaction, sendTransaction } from '../control/crypto-control.mjs'

const blockRouter = express.Router()
blockRouter.post('/mine', mineBlock)

const chainRouter = express.Router()
chainRouter.get('/', getChain)

const cryptoRouter = express.Router()
cryptoRouter.get('/', getPool)
cryptoRouter.post('/wallet', getWallet)
cryptoRouter.get('/transaction:id', getTransaction)
cryptoRouter.post('/transaction', sendTransaction)

const memberRouter = express.Router()
memberRouter.post('/new', postMember)

export { blockRouter, chainRouter, cryptoRouter, memberRouter }
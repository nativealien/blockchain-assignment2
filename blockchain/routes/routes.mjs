import express from 'express'
import { mineBlock } from '../control/block-control.mjs'
import { getChain } from '../control/chain-control.mjs'

const blockRouter = express.Router()
blockRouter.post('/mine', mineBlock)

const chainRouter = express.Router()
chainRouter.get('/', getChain)

export { blockRouter, chainRouter }
import { pubnub } from "../server.mjs";
import Chain from '../models/Schema/ChainSchema.mjs'

export const mineBlock = async (req, res, next) => {
    const block = pubnub.blockchain.newBlock({data: req.body})
    pubnub.broadcast('Blockchain', pubnub.blockchain.chain)

    const test =  await Chain.findOne({ name: "blockchain" })
    const chain = await Chain.findOneAndReplace({ name: "blockchain" }, {name: "blockchain", chain: pubnub.blockchain.chain, pool: pubnub.pool.transactions})
    res.status(201).json({ success: true, statusCode: 201, data: block })
}
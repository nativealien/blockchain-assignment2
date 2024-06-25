import { pubnub } from "../server.mjs";

export const mineBlock = async (req, res, next) => {
    console.log(pubnub.blockchain)
    const block = await pubnub.blockchain.newBlock({data: req.body})
    pubnub.broadcast('Blockchain', pubnub.blockchain.chain)
    res.status(201).json({ success: true, statusCode: 201, data: block })
}
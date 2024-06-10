import { pubnub } from "../server.mjs";

export const getChain = (req, res, next) => {
    res.status(200).json({ success: true, statusCode: 200, data: pubnub.blockchain.chain })
}
import Response from "../models/Response.mjs";
import { pubnub } from "../server.mjs";

export const getChain = (req, res, next) => {
    res.status(200).json(Response.get(null, pubnub.blockchain.chain))
}
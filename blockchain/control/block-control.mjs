import { blockchain } from "../server.mjs";

export const mineBlock = (req, res, next) => {
    const block = blockchain.newBlock({data: req.body})
    res.status(201).json({ success: true, statusCode: 201, data: block })
}
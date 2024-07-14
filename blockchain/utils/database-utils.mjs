import mongoose from 'mongoose';
import Chain from '../models/Schema/ChainSchema.mjs'
import { pubnub } from '../server.mjs';

export const connectDb = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB ansluten till${conn.connection.host}`.cyan);
};

export const saveChain = async (chain) => {
    await Chain.findOneAndReplace({ name: "blockchain" }, {name: "blockchain", chain: pubnub.blockchain.chain})
}

export const savePool = async (chain) => {
    await Chain.findOneAndUpdate(
        { name: "blockchain" },
        { $push: { pool: { $each: pubnub.pool.transactions } } } )
}


// export const mineBlock = async (req, res, next) => {
//     const block = pubnub.blockchain.newBlock({data: req.body})
//     pubnub.broadcast('Blockchain', pubnub.blockchain.chain)

//     const test =  await Chain.findOne({ name: "blockchain" })
//     const chain = await Chain.findOneAndReplace({ name: "blockchain" }, {name: "blockchain", chain: pubnub.blockchain.chain, pool: pubnub.pool.transactions})
//     res.status(201).json({ success: true, statusCode: 201, data: block })
// }

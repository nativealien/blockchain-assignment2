import mongoose from 'mongoose';
import Chain from '../models/Schema/ChainSchema.mjs'
import Pool from '../models/Schema/PoolSchema.mjs';
import { pubnub } from '../server.mjs';

export const connectDb = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB ansluten till${conn.connection.host}`.cyan);
};

export const saveChain = async (block) => {
    try {
        await Chain.findOneAndUpdate(
            { name: "blockchain" },
            { $push: { chain: block } },
            { new: true, upsert: true }
        );
    } catch (error) {
        console.error("Error updating chain:", error);
    }
};

export const saveTransaction = async (transaction) => {
    try {
        await Pool.findOneAndUpdate(
            { name: "transaction" },
            { $push: { pool: transaction } },
            { new: true, upsert: true }
        );
    } catch (error) {
        console.error("Error updating transaction:", error);
    }
};


import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Name is required']
    },
    chain: { 
        type: Array, 
        required: [true, 'Chain is required']
    }
})

export default mongoose.model('Wallet', walletSchema)
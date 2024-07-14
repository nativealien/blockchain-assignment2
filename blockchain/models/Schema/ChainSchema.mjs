import mongoose from "mongoose";


const chainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Name is required']
    },
    chain: { 
        type: Array, 
        required: [true, 'Chain is required']
    },
    pool: { 
        type: Array, 
        required: [true, 'Chain is required']
    }
})

export default mongoose.model('Chain', chainSchema)
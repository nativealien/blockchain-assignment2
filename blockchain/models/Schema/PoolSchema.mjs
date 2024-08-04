import mongoose from "mongoose";

const poolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Name is required']
    },
    pool: { 
        type: Array, 
        required: [true, 'Chain is required']
    },
})

export default mongoose.model('Pool', poolSchema)
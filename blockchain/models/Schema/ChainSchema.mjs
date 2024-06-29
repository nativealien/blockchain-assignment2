import mongoose from "mongoose";
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken';


const chainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Name is required']
    },
    chain: { 
        type: Array, 
        required: [true, 'Chain is required']
    }
})

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//       next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// })

// userSchema.methods.validatePassword = async function (password){
//     return await bcrypt.compare(password, this.password)
// }

// userSchema.methods.generateToken = function() {
//     return jwt.sign({id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TTL})
// }

// userSchema.statics.findByEmail = function(email){
//     console.log('MONGO', email)
//     return this.findOne({ email })
// }

export default mongoose.model('Chain', chainSchema)
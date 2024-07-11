import mongoose from "mongoose";
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
    name: { type: String, 
            required: [true, 'Name is required']
    },
    email: {
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter correct symbol standard...']
    },
    role: {
        type: String,
        enum: ['user', 'node', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 6,
        select: false
    },
    resetToken: String,
    resetTokenExpires: Date,
    created: {
        type: Date,
        default: Date.now
    },
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.validatePassword = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function() {
    return jwt.sign({id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TTL})
}

userSchema.methods.createResetToken = function(){
    const token = crypto.randomBytes(20).toString('hex')
    this.resetToken = crypto.createHash('sha256').update(token).digest('hex')
    this.resetTokenExpires = new Date(Date.now() + 10 * 60 * 1000)
    return this.resetToken
}

userSchema.statics.findByEmail = function(email){
    console.log('MONGO', email)
    return this.findOne({ email })
}

export default mongoose.model('User', userSchema)
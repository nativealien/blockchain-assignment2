import mongoose from "mongoose";
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
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 4,
        select: false
    },
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

export default mongoose.model('User', userSchema)
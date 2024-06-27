import { asyncHandler } from "../middle/asyncHandler.mjs";
import User from "../models/schema/UserSchema.mjs";

export const register = asyncHandler( async (req, res, next) => {
    const { name, email, password, role } = req.body
    const user = await User({name, email, password, role})

    user.save()

    createAndSendToken(user, 201, res)
})

export const login = asyncHandler( async (req, res, next) => {
    const { email, password } = req.body
    if(!email || !password) return next(new Error('Email or password missing...'))

    const user = await User.findOne({ email }).select('+password')
    if(!user) return next(new Error('Login failed...'))

    const check = await user.validatePassword(password)
    if(!check) return next(new Error('Login failed...'))
    
    createAndSendToken(user, 201, res)
})

export const getMe = asyncHandler( async (req, res, next) => {
    const user = await User.findById(req.user._id)
    res.status(200).json({ success: true, statusCode: 200, data: user})
})

const createAndSendToken = (user, statusCode, res) => {
    const token = user.generateToken();
    res.status(statusCode).json({ success: true, statusCode, token})
}


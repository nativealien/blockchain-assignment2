import { asyncHandler } from "../middle/asyncHandler.mjs";
import Response from "../models/Response.mjs";
import User from "../models/schema/UserSchema.mjs";

export const register = asyncHandler( async (req, res, next) => {
    const { name, email, address, password, role } = req.body
    const user = await User({name, email, address, password, role})

    user.save()

    createAndSendToken(user, 201, res)
})

export const login = asyncHandler( async (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body
    if(!email || !password) return next(new Error('Email or password missing...'))

    const user = await User.findOne({ email }).select('+password')
    if(!user) return next(new Error('Login failed...'))

    const check = await user.validatePassword(password)
    if(!check) return next(new Error('Login failed...'))
    
    createAndSendToken(user, 201, res)
})

export const lostPassword = asyncHandler(async (req, res, next) => {
    const email = req.body.email;
    if(!email) return next(new Error('No email...'))
    
    const user = await User.findOne({ email })
    if(!user) return next(new Error('No user with that mail...'))
    
    const resetToken = user.createResetToken()
    await user.save({ validateBeforeSave: false })

    const url = `${req.protocol}://${req.get('host')}/api/v1/resetpassword/${resetToken}`

    res.status(201).json(Response.post(null, {token: resetToken, url: url}))
})

export const resetPassword = asyncHandler(async (req, res, next) => {
    const password = req.body.password;
    const token = req.params.token;
    if (!password) return next(new Error('Password missing...'));

    let user = await User.findOne({ resetPasswordToken: token });
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;

    await user.save();

    createAndSendToken(user, 200, res);
})

export const updateUser = asyncHandler(async (req, res, next) => {
    const updateFields = {}
    if(req.body.name) updateFields.name = req.body.name
    if(req.body.email) updateFields.email = req.body.email

    const user = await User.findByIdAndUpdate(req.body.id, updateFields, {
        new: true,
        runValidators: true
    })

    res.status(200).json(Response.get(null, data = user))
})

export const updatePassword = asyncHandler(async (req, res, next) => {
    const { id, password, newPassword } = req.body

    const user = await User.findById(id).select('+password')
    if(!await user.validatePassword(password)) return next(new Error('Bad password...'))
    
    user.password = newPassword;
    await user.save()

    createAndSendToken(user, 200, res)
})

export const getMe = asyncHandler( async (req, res, next) => {
    const user = await User.findById(req.user._id)
    res.status(200).json(Response.get(null, { name: user.name, email: user.email, role: user.role }))
})

const createAndSendToken = (user, statusCode, res) => {
    const token = user.generateToken();
    res.status(statusCode).json(new Response({statusCode: statusCode, data: {token: token, user: user } }))
}


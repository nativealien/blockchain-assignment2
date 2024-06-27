import jwt from 'jsonwebtoken'
import User from '../models/schema/UserSchema.mjs'
import { asyncHandler } from './asyncHandler.mjs'

export const protect = asyncHandler( async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token) next(new Error('Unauthorized user, access denied...'))
    
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decode.id)
    if(!req.user) next(new Error('Unauthorized user, access denied...'))
    
    next()
})

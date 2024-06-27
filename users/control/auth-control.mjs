import { asyncHandler } from "../middle/asyncHandler.mjs";
import User from "../models/schema/UserSchema.mjs";

export const register = asyncHandler( async (req, res, next) => {
    const { name, email, password, role } = req.body
    const user = await User({name, email, password, role})

    user.save()

    res.status(201).json({ success: true, user: {
        name: name,
        email: email,
        password: password
    }})
})


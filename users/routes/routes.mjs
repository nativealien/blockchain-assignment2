import express from 'express';
import { register, login, getMe } from '../control/auth-control.mjs';
import { protect } from '../middle/authorization.mjs';

const authRouter = express.Router()
authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/me',protect, getMe)

export { authRouter }

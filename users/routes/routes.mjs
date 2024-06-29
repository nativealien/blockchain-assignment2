import express from 'express';
import { register, login, lostPassword, resetPassword, getMe, updateUser, updatePassword } from '../control/auth-control.mjs';
import { protect } from '../middle/authorization.mjs';

const authRouter = express.Router()
authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/lostpassword', lostPassword);
authRouter.put('/resetpassword/:token', resetPassword);
authRouter.put('/updateuser', protect, updateUser);
authRouter.put('/updatepassword', protect, updatePassword);
authRouter.get('/me',protect, getMe);

export { authRouter }

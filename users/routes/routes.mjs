import express from 'express';
import { register } from '../control/auth-control.mjs';

const authRouter = express.Router()
authRouter.post('/register', register)

export { authRouter }

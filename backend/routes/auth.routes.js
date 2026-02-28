import express from 'express'
import { loginAdmin, logout, registerAdmin } from '../controllers/auth.controllers.js'

export const authRouter = express.Router()

authRouter.post('/register', registerAdmin)
authRouter.post('/login', loginAdmin)
authRouter.post('/logout', logout)
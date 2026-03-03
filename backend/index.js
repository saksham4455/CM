import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import express from 'express'
import { authRouter } from './routes/auth.routes.js'
import { connectDB } from './lib/connectDB.js'
import cors from 'cors'
import REGISTER from './routes/register.routes.js'
config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/registrations', REGISTER)

app.listen(PORT, () => {
    console.log(`running the server on port ${PORT}`);
    connectDB()
})
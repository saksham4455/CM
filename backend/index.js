import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import express from 'express'
import { authRouter } from './routes/auth.routes.js'
import { connectDB } from './lib/connectDB.js'
config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/auth/v1', authRouter)



app.listen(PORT, () => {
    console.log(`running the server on port ${PORT}`);
    connectDB()
})
import { config } from "dotenv";
import mongoose from "mongoose";
config()

export async function connectDB(){
    try {
        mongoose.connection.on('connected', () => {
            console.log('Db is connected yayyy! 😁');            
        })
        await mongoose.connect(process.env.MONGO_DB_URI)
    } catch (error) {
        console.log(error.message);        
    }
}
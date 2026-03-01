import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    username: String,
    email : {
        type : String,
        unique : true
    },
    password : String
})

export const Admin = mongoose.model('Admin', AdminSchema)
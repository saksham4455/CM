import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.js"
import bcrypt from 'bcrypt'

export const registerAdmin = async (req, res) => {
    try {
        const {username, email, password} = req.body
        console.log(username, email, password);
        
        const user = await Admin.findOne({email})
        console.log(user);
        
        if(user){
            return res.status(400).json({message : 'user already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        await Admin.create({
            username, email, password : hashedPassword
        })        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : 'internal server error \n' + error.message})        
    }
}

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: true,        // true in production (https)
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // ek din
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
      },
    });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export async function logout(req, res) {
  try {
    res.clearCookie("adminToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  try {
    const token = req.cookies.adminToken;

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    

    req.admin = decoded; // attach user info
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
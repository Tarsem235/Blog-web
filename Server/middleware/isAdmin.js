const JWT = require("jsonwebtoken");
const userModel = require("../models/User");

const isAdmin = async (req, res, next) => {
  try {
    // ✅ Token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = JWT.verify(token, process.env.JWT_SECRATE);
    console.log("✅ Decoded JWT:", decoded);

    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ success: false, message: "User is not an admin" });
    }

    req.user = user; // ✅ Pass user to next middleware
    next();
  } catch (error) {
    console.error("❌ isAdmin Middleware Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};





const isLogin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = JWT.verify(token, process.env.JWT_SECRATE);

    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};


module.exports = { isAdmin, isLogin };

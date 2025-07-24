const bcrypt = require("bcryptjs");
const userModel = require("../models/User");
const jwt = require('jsonwebtoken')
// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (username, email, password) are required",
      });
    }

    // Check if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Handle profile image (if uploaded)
    const imagePath = req.file ? req.file.filename : "default.png";

    // Create and save new user
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      profile: imagePath,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profile: newUser.profile,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const FindUser = await userModel.findOne({ email });
    if (!FindUser) {
      return res.status(404).json({ success: false, message: "No User Found. Please register" });
    }

    const confirmPassword = await bcrypt.compare(password, FindUser.password);
    if (!confirmPassword) {
      return res.status(401).json({ success: false, message: "Password doesn't match" });
    }

    // ✅ Fix: Correct payload
    const token = jwt.sign(
      { userId: FindUser._id.toString() },
      process.env.JWT_SECRATE,
      { expiresIn: '30d' }
    );

    console.log("✅ Token Payload:", jwt.decode(token)); // ✅ Check payload

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ success: true, message: "Login Successfully", user: FindUser, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// // Logout
const LogOut = async (req, res) => {
  try{
res.clearCookie('token')
res.status(200).json({sucess:true,message:' Logout Sucessfully'})
  }
  catch(error){
  console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = { registerUser ,loginUser , LogOut };
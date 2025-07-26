const bcrypt = require("bcryptjs");
const userModel = require("../models/User");
const createTokenAndSaveCookie = require("../jwt/generatetoken");
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
  const { email, password } = req.body;

  console.log("Received email:", email);
  console.log("Received password:", password);

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid user or password" });
    }

    console.log("User found:", user);


    if (!user.password) {
      return res.status(500).json({ message: "User password is missing in database" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid user or password" });
    }

    const token = createTokenAndSaveCookie(user._id, res);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        token,
        _id: user._id,
        name: user.username,
        email: user.email,
        profile: user.profile, // ✅ important
        role: user.role  
      },
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// // Logout
const LogOut = async (req, res) => {
  try {
    res.clearCookie('token')
    res.status(200).json({ sucess: true, message: ' Logout Sucessfully' })
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = { registerUser, loginUser, LogOut };
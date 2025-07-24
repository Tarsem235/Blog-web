const express = require("express");
const { registerUser, loginUser , LogOut} = require("../controllers/authController");
const upload = require("../middleware/multer");
// const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Register new user
router.post("/register",upload.single('profile') , registerUser);

// Login user
router.post("/login", loginUser);

// Get logged-in user profile
router.post("/logout", LogOut);

module.exports = router;
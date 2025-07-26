const express = require('express');
const Addcomment = require('../controllers/Comments')    // Controller for handling comment logic
const { isLogin } = require('../middleware/isAdmin');


     // Middleware for checking admin login
const commentRouter = express.Router()

// Route to add a comment
commentRouter.post('/addcomment', Addcomment)


module.exports = commentRouter
const express = require("express");
const { isAdmin } = require('../middleware/isAdmin');
const upload = require("../middleware/multer");
const {createBlog , deletePost , getPost , Update} = require("../controllers/blogController");
// const protect = require("../utlis/authMiddleware");

const blogrouter = express.Router();

blogrouter.post("/create",isAdmin,upload.single('postimage'), createBlog);
blogrouter.delete('/delete/:id' , isAdmin , deletePost)
blogrouter.get('/getPost' , getPost)
blogrouter.patch('/update/:id', isAdmin, upload.single('postimage'), Update)

module.exports = blogrouter;
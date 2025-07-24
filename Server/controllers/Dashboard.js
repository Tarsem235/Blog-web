const userModel = require('../models/User')
const PostModel = require('../models/Blog')
const CommentModel = require('../models/comments')
const fs = require('fs')
const path = require('path')
const GetAllData = async (req, res) => {
    try {
        const Users = await userModel.find()
        const posts = await PostModel.find()
        const comments = await CommentModel.find()
        if (!Users && !posts) {
            return res.status(404).json({ success: false, message: "No Data Found" });
        }
        res.status(200).json({ success: true, Users, posts, comments });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server erreo" });
    }
}
const getUsers = async (req, res) => {
    try {
        const Users = await userModel.find()
        if (!Users) {
            return res.status(404).json({ success: false, message: "No Data Found" });
        }
        return res.status(200).json({ success: true, Users })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server erreo" });
    }
}

const userDelete = async (req, res) => {
    try {
        const userId = req.params.id
        const result = await userModel.findById(userId)
        if (!result) {
            return res.status(404).json({ success: false, message: "No Data Found" });
        }
        if (result.role == 'admin') {
            return res.status(404).json({ success: false, message: "Sorry you Admin you can't Delete your account" });
        }
        if (result.profile) {
            const profilepath = path.join('public/images', result.profile)
            fs.promises.unlink(profilepath)
                .then(() => console.log('Post image deleted'))
                .catch(error => console.log('error deleting post ', error))
        }
        const deleteuser = await userModel.findByIdAndDelete(userId)
        res.status(200).json({ success: true, message: 'delete user sucessfully', user: deleteuser })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server erreo" });
    }
}
module.exports = { GetAllData, getUsers, userDelete }
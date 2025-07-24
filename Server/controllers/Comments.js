const mongoose = require('mongoose');
const CommentModel = require('../models/comments');
const PostModel = require('../models/Blog');

const Addcomment = async (req, res) => {
    try {
        const { postId, comment } = req.body;

        // 🛡️ Check if req.user is set
        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: "Unauthorized: User not found in request" });
        }
        const userId = req.user._id;

        // ✅ Validate Post ID
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ success: false, message: "Invalid Post ID" });
        }

        // ✅ Find the Post
        const existPost = await PostModel.findById(postId);
        if (!existPost) {
            return res.status(404).json({ success: false, message: "Blog post not found" });
        }

        // ✅ Create and save new Comment
        const newComment = new CommentModel({
            postId,
            userId,
            comment,
        });
        await newComment.save();

        // ✅ Add comment reference to Post
        existPost.comments.push(newComment._id);
        await existPost.save();

        // ✅ Populate user for response (optional)
        await newComment.populate('userId', 'username email');

        res.status(200).json({
            success: true,
            message: "Comment added successfully",
            comment: newComment,
        });
    } catch (error) {
        console.error("🔥 AddComment Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = Addcomment;

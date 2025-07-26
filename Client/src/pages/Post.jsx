import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { BaseUrl, post, get } from "../Services/Endpoint.js";
import "react-toastify/dist/ReactToastify.css";

const SinglePost = () => {
  const { id } = useParams();
  const [Post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch single post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await get(`/api/singlepost/${id}`, {
          withCredentials: true,
        });
        console.log("👉 Post Data:", res.data);
        setPost(res.data.Post);
      } catch (err) {
        console.error("❌ Error fetching post:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    console.log("🔐 Token:", token);

    if (!token) {
      toast.error("Please login first to comment!");
      return;
    }

    if (!newComment.trim()) {
      toast.warning("Comment cannot be empty!");
      return;
    }

    try {
      const res = await post(
        `/comment/addcomment`,
        { postId: id, comment: newComment },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      console.log("✅ Comment Added:", res.data);

      // Add the new comment to state
      const addedComment = {
        userId: { username: res.data?.user?.username || "You" },
        comment: newComment,
      };

      setPost((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), addedComment],
      }));

      setNewComment("");
      toast.success("Comment added successfully!");
    } catch (err) {
      console.error("❌ Error adding comment:", err.response?.data || err.message);

      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again!");
        localStorage.removeItem("token");
      } else {
        toast.error("Failed to add comment. Try again!");
      }
    }
  };

  // Show loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading Post...</p>
      </div>
    );
  }

  // Post not found
  if (!Post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Post not found 😕</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pt-10">
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Post Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <img
            src={`${BaseUrl}/images/${Post.image}`}
            alt="Post Cover"
            className="w-full h-64 object-cover rounded-md mb-6"
          />
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-wide">
            {Post.title}
          </h1>
          <p className="text-gray-500 mb-6 text-sm">
            <span>{Post.createdAt?.slice(0, 10)}</span>
          </p>
          <p className="text-base leading-relaxed text-gray-700">{Post.desc}</p>
        </div>

        {/* Comments Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">💬 Comments</h2>

          {/* Comment List */}
          <div className="space-y-4">
            {Post.comments && Post.comments.length > 0 ? (
              Post.comments.map((c, index) => (
                <div
                  key={index}
                  className="bg-white rounded-md shadow p-4 border border-gray-200"
                >
                  <p className="font-semibold text-blue-600">
                    {c.userId?.username || "Anonymous"}
                  </p>
                  <p className="text-gray-700">{c.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet 😕</p>
            )}
          </div>

          {/* Add Comment Form */}
          <form
            onSubmit={handleCommentSubmit}
            className="mt-6 bg-white rounded-md shadow p-4 border border-gray-200"
          >
            <textarea
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
              rows="3"
            ></textarea>
            <button
              type="submit"
              className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors shadow"
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SinglePost;

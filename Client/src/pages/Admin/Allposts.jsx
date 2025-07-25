import React, { useEffect, useState } from "react";
import {BaseUrl, post , get} from "../../Services/Endpoint"
import { Link } from "react-router-dom";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null); // Active post for fullscreen viewer
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await get("/blog/getPost");
        setPosts(res.data.posts);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };
    fetchPosts();
  }, []);

  // Fetch comments for active post
  useEffect(() => {
    const fetchComments = async () => {
      if (!activePost) return;
      try {
        const res = await get(
          `/comment/addcomment/${activePost._id}`
        );
        setComments(res.data.comments);
        console.log(res.data.comments);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };
    fetchComments();
  }, [activePost]);

  // Post a new comment
  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await post("/comment/addcomment", {
        postId: activePost._id,
        user: "Tarsem", // Replace with logged-in user
        text: newComment,
      });
      setComments([res.data.comment, ...comments]); // Add to top
      setNewComment(""); // Clear input
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  return (
    <div className="pt-19 min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-10">
      <h1 className="text-5xl font-extrabold text-center text-pink-600 drop-shadow-lg mb-12">
        📸 All Posts
      </h1>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {posts.map((post) => (
          <div
            key={post._id}
            onClick={() => setActivePost(post)}
            className="bg-white rounded-2xl shadow-xl cursor-pointer hover:scale-105 transform transition duration-300"
          >
            <div className="relative">
              <img
                src={`${BaseUrl}/images/${post.image}`}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <span className="absolute top-2 right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded-full shadow">
                NEW
              </span>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{post.desc}...</p>
              <Link to={`/post/${post._id}`}>
                <li className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition font-semibold">
                  View Details
                </li>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Viewer */}
      {activePost && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative overflow-y-auto max-h-screen">
            {/* Close Button */}
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
            >
              ✕
            </button>

            {/* Post Details */}
            <img
              src={`${BaseUrl}/images/${activePost.image}`}
              alt={activePost.title}
              className="w-full rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {activePost.title}
            </h2>
            <p className="text-gray-600 mb-4">{activePost.description}</p>

            {/* Comments Section */}
            <div>
              <h3 className="text-lg font-bold mb-2">💬 Comments</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto mb-4">
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="bg-gray-100 p-2 rounded text-sm"
                  >
                    <strong>{comment.user}</strong>: {comment.text}
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 px-3 py-2 rounded border focus:outline-none"
                />
                <button
                  onClick={handlePostComment}
                  className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { post} from "../../Services/Endpoint"
export default function AddPost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("Draft");
  const [images, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Show preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !desc || !images) {
      toast.error("⚠️ Title, Content, and Image are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("status", status);
    formData.append("postimage", images); // ✅ field name matches backend

    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      const res = await post(
        "/blog/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Post Created:", res.data);
      toast.success("🎉 Blog post created successfully!");

      // Reset Form
      setTitle("");
      setDesc("");
      setStatus("Draft");
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error("❌ Error Creating Post:", err.response?.data || err.message);
      toast.error(
        err.response?.data?.message || "❌ Failed to create post. Please try again."
      );
    }
  };

  return (
    <div className="p-4 mt-20">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-2xl font-bold text-blue-600 mb-4">➕ Add New Post</h1>

      <div className="bg-white shadow rounded-lg p-6 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Write your post content here..."
              rows="5"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              required
            ></textarea>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
              required
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 h-40 w-40 object-cover rounded-lg shadow"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

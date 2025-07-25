import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { patch } from "../../Services/Endpoint"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    desc: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("desc", form.desc);
      if (image) formData.append("postimage", image);

      await patch(`/blog/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("✅ Post updated successfully!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error("❌ Update failed:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to update post");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Edit Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              name="desc"
              value={form.desc}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your post description"
              required
            ></textarea>
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-32 h-32 object-cover rounded-md border"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Update Post
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditPost;

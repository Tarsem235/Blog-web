import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/AuthReducer";
import {BaseUrl, get} from "../Services/Endpoint"

export default function BlogUserProfile() {
  const [posts, setPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.user);
  console.log("Redux User 👉", currentUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get("/dashboard");
        const data = res.data;
        setPosts(data.posts || []);
        setAllUsers(data.Users || []);
        setComments(data.comments || []);
      } catch (err) {
        console.error("🚨 Axios Error:", err.response?.data || err.message);
      }
    };

    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    bio: currentUser?.bio || "",
    profilePic: currentUser?.profile || "",
  });

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file); // Store file for upload
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, profilePic: imageUrl }));
    }
  };

  const handleSave = async () => {
    try {
      const formPayload = new FormData();
      formPayload.append("username", formData.username);
      formPayload.append("email", formData.email);
      formPayload.append("bio", formData.bio);
      if (uploadFile) {
        formPayload.append("profile", uploadFile);
      }

      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${BaseUrl}//auth/updateProfile`,
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        console.log("✅ Profile Updated:", res.data);
        dispatch(SetUser(res.data.user)); // Update Redux user
        setEditMode(false);
      }
    } catch (err) {
      console.error("❌ Profile Update Failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-17">
      <div className="max-w-5xl mx-auto py-8 px-4">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:space-x-12 items-center md:items-start">
          {/* Profile Picture */}
          <div className="flex-shrink-0 relative">
            <img
              src={
                uploadFile
                  ? formData.profilePic
                  : `${BaseUrl}/images/${formData.profilePic}`
              }
              alt="profile"
              className="rounded-full w-36 h-36 border-2 border-pink-500 object-cover"
            />
            {editMode && (
              <div className="absolute bottom-0 right-0">
                <label className="cursor-pointer bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  Change
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 mt-6 md:mt-0">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-semibold">{formData.username}</h2>
              {!editMode && (
                <button
                  onClick={handleEdit}
                  className="bg-gray-100 text-sm px-4 py-1 rounded border hover:bg-gray-200"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="flex space-x-8 mt-4 text-gray-700">
              <div>
                <span className="font-bold">{posts.length}</span> posts
              </div>
              <div>
                <span className="font-bold">{allUsers.length}</span> Total Users
              </div>
              <div>
                <span className="font-bold">{comments.length}</span> comments
              </div>
            </div>

            {/* Editable or Static Info */}
            {editMode ? (
              <div className="mt-4 space-y-2">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border rounded px-3 py-2 text-sm"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border rounded px-3 py-2 text-sm"
                />
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Bio"
                  rows="3"
                  className="w-full border rounded px-3 py-2 text-sm"
                ></textarea>
                <div className="flex space-x-3 mt-2">
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <p className="font-semibold">{formData.username}</p>
                <p className="text-sm text-gray-600">{formData.email}</p>
                <p className="text-sm text-gray-700 mt-1">{formData.bio}</p>
              </div>
            )}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="border-t mt-8 pt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">📸 All Posts</h2>
          <div className="grid grid-cols-3 md:grid-cols-7">
            {posts.map((post, id) => (
              <div
                key={id}
                className="relative group overflow-hidden rounded cursor-pointer"
              >
                <Link to={`/post/${post._id}`}>
                  <img
                    src={`${BaseUrl}/images/${post.image}`}
                    alt="Blog Post"
                    className="w-30 h-30 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
// import { get } from "../../Services/Endpoint.js";
import {Link} from "react-router-dom"
import {BaseUrl, get , dele} from "../Services/Endpoint.js"
import { useEffect, useState } from "react";
export default function Dashboard() {
  const [posts, setPosts] = useState([])
  // const [post ,  setPost]=useState([])
  const [users, setUser] = useState([])
  const [comments, setComment] = useState([])
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await get('/dashboard')
        const data = res.data
        setPosts(data.posts)
        setUser(data.Users)
        setComment(data.comments)
        console.log("👉 Full Response:", data);

      } catch (err) {
        console.error("🚨 Axios Error:", err.response?.data || err.message);
      }

    }

    getData();

  }, [])
const deletePost = async (id) => {
  if (window.confirm("❗ Are you sure you want to delete this post?")) {
    try {
      const token = localStorage.getItem("token");
      console.log("📦 Token:", token);

      await dele(`/blog/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ Update posts state after deletion
      setPosts((prevPosts) => prevPosts.filter((p) => p._id !== id));

      console.log(`✅ Post ${id} deleted successfully`);
    } catch (err) {
      console.error(`🚨 Failed to delete post ${id}:`, err.response?.data || err.message);
    }
  }
};



  return (
    <div className="flex h-screen bg-gray-100 pt-22">
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700">Total Posts</h2>
            <p className="text-3xl font-bold text-blue-600">{posts && posts.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
            <p className="text-3xl font-bold text-green-600">{users && users.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700">Comments</h2>
            <p className="text-3xl font-bold text-purple-600">{comments && comments.length}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg">
  <table className="w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Id
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Title
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Date
        </th>
        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {posts.map((post, index) => (
        <tr key={index}>
          <td className="px-6 py-4">{index + 1}</td>
          <td className="px-6 py-4 break-words">{post.title}</td>
          <td className="px-6 py-4">{post.createdAt.slice(0, 10)}</td>
          <td className="px-6 py-4 text-right">
            <Link to={`/dashboard/edit/${post._id}`}>
            <button
              className="text-gray-400 hover:text-black cursor-pointer"
              
            >
              Edit  /  
            </button>
            </Link>
            <button
              className="text-red-600 hover:text-red-900 cursor-pointer"
              onClick={() => deletePost(post._id)}
            >
               Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
    </div>
  );
}

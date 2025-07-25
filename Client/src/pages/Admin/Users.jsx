import React, { useEffect, useState } from "react";
import {BaseUrl, get , dele} from "../Services/Endpoint"

export default function Users() {
  const [Users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await get("/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        console.log("👉 Full Response:", data);
        setUsers(data.Users || data.users || []);
      } catch (err) {
        console.error("🚨 Axios Error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm("❗ Are you sure to delete this user?")) {
      try {
        const token = localStorage.getItem("token");
        console.log("📦 Token:", localStorage.getItem("token"));

        await dele(`/dashboard/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== id));
        console.log(`✅ User ${id} deleted successfully`);
      } catch (err) {
        console.error(`🚨 Failed to delete user ${id}:`, err.response?.data || err.message);
      }
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen pt-17">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">👥 Users</h1>

      {loading ? (
        <div className="text-gray-600">Loading users...</div>
      ) : Users.length === 0 ? (
        <div className="text-gray-600">No users found.</div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Users.map((user, index) => (
                <tr key={user._id || index}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

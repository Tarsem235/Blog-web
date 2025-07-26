// 📁 src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { BaseUrl, post } from "../Services/Endpoint.js";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { SetUser } from "../redux/AuthReducer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate inputs
  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email is invalid";

    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    return newErrors;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await post("/auth/login", form);
      const data = res.data;

      console.log("✅ Login Response:", data);

      if (data?.user?.token) {
        // Save token to localStorage
        localStorage.setItem("token", data.user.token);
        console.log("📦 Token Saved:", data.user.token);

        // Dispatch user to Redux
        dispatch(SetUser(data.user));

        // Show success message
        toast.success("Login successful 🎉", { position: "top-right" });

        // Delay navigation slightly to ensure token is stored
        setTimeout(() => navigate("/"), 300);
      } else {
        toast.error("❌ No token received from server", {
          position: "top-right",
        });
      }
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data);
      toast.error(
        err.response?.data?.message || "Login failed. Please try again.",
        { position: "top-right" }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          👋 Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            to={"/register"}
            className="text-yellow-500 font-medium hover:underline cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;

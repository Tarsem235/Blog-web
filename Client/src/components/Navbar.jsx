import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BaseUrl, post } from "../Services/Endpoint";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/AuthReducer";
import {
  Menu,
  X,
  Home,
  BookOpen,
  UserCircle,
  LayoutDashboard,
  LogOut,
  LogIn,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleMobileMenu = () => setMobileMenu(!mobileMenu);

  const handleLogout = async () => {
    setIsOpen(false);
    try {
      const res = await post("/auth/logout");
      if (res.status === 200) {
        dispatch(removeUser());
        navigate("/");
        toast.success("🚪 LogOut Successfully 🎉");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Logout Failed");
    }
  };

  return (
    <header className="fixed w-full bg-gray-100 backdrop-blur-sm shadow-md z-50">
      <div className="mx-auto py-3 flex justify-between">
        {/* Logo */}
        <div className="text-3xl px-6 font-extrabold tracking-wide text-gray-800">
          Blogify
        </div>

        {/* Desktop Menu */}
        {user && (
          <nav className="hidden md:flex space-x-6 py-3 pl-[25cm]">
            <Link to="/" className="flex items-center gap-2 text-gray-800 hover:text-blue-600 font-medium transition">
              <Home size={18} /> Home
            </Link>
            <Link to="/about" className="flex items-center gap-2 text-gray-800 hover:text-blue-600 font-medium transition">
              <BookOpen size={18} /> About
            </Link>
            <Link to={`/profile/${user._id}`} className="flex items-center gap-2 text-gray-800 hover:text-blue-600 font-medium transition">
              <UserCircle size={18} /> Profile
            </Link>
          </nav>
        )}

        {/* Profile or Sign In */}
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="relative pr-4">
              <img
                onClick={toggleDropdown}
                src={`${BaseUrl}/images/${user.profile}`}
                alt="profile"
                className="h-12 w-12 hidden lg:block rounded-full border-2 border-blue-400 shadow-lg cursor-pointer hover:scale-110 hover:border-blue-500 transition duration-300 ease-in-out"
              />

              {/* Dropdown Menu */}
              {isOpen && (
                <ul className="absolute right-0 mt-3 w-48 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 z-50 animate-fade-in">
                  {user.role === "admin" && (
                    <li className="px-5 py-3 hover:bg-blue-50 hover:text-blue-700 font-medium rounded-t-2xl transition-colors duration-300">
                      <Link to="/dashboard" className="flex items-center gap-2">
                        <LayoutDashboard size={18} /> Dashboard
                      </Link>
                    </li>
                  )}
                  <li className="px-5 py-3 border-t border-gray-200 hover:bg-red-50 hover:text-red-600 font-medium rounded-b-2xl transition-colors duration-300">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2"
                    >
                      <LogOut size={18} /> Log Out
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-1 rounded-full font-medium hover:bg-blue-700 transition">
                <LogIn size={18} /> Sign In
              </button>
            </Link>
          )}

          {/* Hamburger Menu */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {mobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white px-4 py-3 space-y-3 shadow-lg rounded-b-xl">
          {user && (
            <>
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-800 hover:text-blue-600 font-medium transition"
                onClick={() => setMobileMenu(false)}
              >
                <Home size={18} /> Home
              </Link>
              <Link
                to="/about"
                className="flex items-center gap-2 text-gray-800 hover:text-blue-600 font-medium transition"
                onClick={() => setMobileMenu(false)}
              >
                <BookOpen size={18} /> About
              </Link>
              <Link
                to={`/profile/${user._id}`}
                className="flex items-center gap-2 text-gray-800 hover:text-blue-600 font-medium transition"
                onClick={() => setMobileMenu(false)}
              >
                <UserCircle size={18} /> Profile
              </Link>
            </>
          )}

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMobileMenu(false);
              }}
              className="flex items-center gap-2 w-full bg-red-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-red-600 transition"
            >
              <LogOut size={18} /> Log Out
            </button>
          ) : (
            <Link to="/login" onClick={() => setMobileMenu(false)}>
              <button className="flex items-center gap-2 w-full bg-blue-600 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-700 transition">
                <LogIn size={18} /> Sign In
              </button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;

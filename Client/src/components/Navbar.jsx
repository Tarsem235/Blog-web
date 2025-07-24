import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/AuthReducer";
import { Menu, X } from "lucide-react"; // hamburger icons

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
      const res = await axios.post("https://blogify-web-app-mkqy.onrender.com/auth/logout");
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

  const navLinks = [
    { to: "/", label: "🏠 Home" },
    { to: "/about", label: "📖 About" },
    { to: "/profile/123456", label: "👤 Profile" },
  ];

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
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-800 hover:text-blue-600 font-medium transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Profile or Sign In */}
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="relative pr-4">
              {/* Profile Image */}
              <img
                onClick={toggleDropdown}
                src={`https://blogify-web-app-mkqy.onrender.com/images/${user.profile}`}
                alt="profile"
                className="h-12 w-12 hidden lg:block rounded-full border-2 border-blue-400 shadow-lg cursor-pointer hover:scale-110 hover:border-blue-500 transition duration-300 ease-in-out"
              />

              {/* Dropdown Menu */}
              {isOpen && (
                <ul className="absolute right-0 mt-3 w-48 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 z-50 animate-fade-in">
                 {user && user.role =='admin' ?
                 <li className="px-5 py-3 hover:bg-blue-50 hover:text-blue-700 font-medium rounded-t-2xl transition-colors duration-300">
                    <Link to="/dashboard" className="flex items-center gap-2">
                      📊 <span>Dashboard</span>
                    </Link>
                  </li> : " " 
                }
                 
                  <li className="px-5 py-3 border-t border-gray-200 hover:bg-red-50 hover:text-red-600 font-medium rounded-b-2xl transition-colors duration-300">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2"
                    >
                      🚪 <span>Log Out</span>
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-blue-600 text-white px-4 py-1 rounded-full font-medium hover:bg-blue-700 transition">
                Sign In
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
          {user &&
            navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block text-gray-800 hover:text-blue-600 font-medium transition"
                onClick={() => setMobileMenu(false)}
              >
                {link.label}
              </Link>
            ))}

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMobileMenu(false);
              }}
              className="block w-full bg-red-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-red-600 transition"
            >
              🚪 Log Out
            </button>
          ) : (
            <Link to="/login" onClick={() => setMobileMenu(false)}>
              <button className="    w-full bg-blue-600 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-700 transition">
                Sign In
              </button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;

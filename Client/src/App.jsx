import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Post from "./pages/Post";
import About from "./pages/About";
import Profile from "./pages/Profile";
import UserLayout from "./Layouts/UserLayout";
import AdminLayout from "./Layouts/AdminLayout";
import Addpost from "./pages/Admin/Addpost";
import Users from "./pages/Admin/Users";
import Allposts from "./pages/Admin/Allposts";
import Dashboard from "./pages/Admin/Dashboard";
import Splash from "./styles/Splash";
import EditPost from "./pages/Admin/EditPost"
function App() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000); // ⏳ 3 seconds
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {show ? (
        <Splash />
      ) : ( <div>
        
        <Router>
          <Routes>
            {/* User Layout */}
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />
              <Route path="post/:id" element={<Post />} />
              <Route path="profile/:id" element={<Profile />} />
              <Route path='about' element={<About/>}/>
            </Route>

            {/* Admin Layout */}
            <Route path="/dashboard" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="addpost" element={<Addpost />} />
              <Route path="user" element={<Users />} />
              <Route path="allpost" element={<Allposts />} />
              <Route path="edit/:id" element={<EditPost />} />
            </Route>

            {/* Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
        </div>
      )}
    </>
  );
}

export default App;

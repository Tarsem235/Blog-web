import React from "react";
import { FaUserCircle, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useState , useEffect } from "react";
import {BaseUrl, get} from "../Services/Endpoint.js"
import { Link } from "react-router-dom";
export default function HomePage() {
  const [posts , setPost]=useState([])
  useEffect(()=>{
 const res=get("/blog/getPost")
.then((res)=> {
  setPost(res.data.posts)
  console.log(res.data.posts)
})
  },[])
  return (
    <div className="font-sans text-gray-800 pt-14">
      <section
        className="pt-24 h-[80vh] bg-cover bg-center flex flex-col justify-center items-center text-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?fit=crop&w=1400&q=80')",
        }}
      >
        <div className="bg-black/50 p-8 rounded-xl">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-wide">
            Your Stories, Your Way ✨
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-200">
            Share your ideas with a world-class professional design.
          </p>
          <div className="space-x-4">
            <a
              href="/blogs"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
            >
              Explore Blogs
            </a>
            <a
              href="/create"
              className="inline-block px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-blue-700 transition"
            >
              Start Writing
            </a>
          </div>
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="py-15 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            📝 Latest Blogs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((blog , index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow hover:shadow-xl hover:scale-105 transition-all"
              >
                <img
                  src={`${BaseUrl}/images/${blog.image}`}
                  alt={`Blog Cover ${blog}`}
                  className="rounded-t-xl w-full h-52 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                     {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {blog.desc}
                  </p>
                  <Link
                    to={`/post/${blog._id}`}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 text-center py-8">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-blue-400 transition">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            <FaInstagram size={20} />
          </a>
        </div>
        <p>© 2025 Blogify. All rights reserved.</p>
      </footer>
    </div>
  );
}

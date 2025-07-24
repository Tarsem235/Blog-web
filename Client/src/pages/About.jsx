import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa"; // social icons

const About = () => {
  return (
    <div className="pt-10 min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          About Blogify 🚀
        </h1>
        <p className="text-center text-lg text-gray-600 mb-10">
          Your space to share stories, ideas, and creativity.
        </p>

        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-600 mb-3">
            📌 Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Blogify is designed for writers, creators, and thinkers. Our mission
            is to give everyone a platform where they can express themselves,
            connect with like-minded people, and make their voices heard.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-600 mb-3">
            👥 Meet the Team
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We’re a small team of passionate developers, designers, and
            storytellers who believe in the power of words. Together, we’ve
            built Blogify to make blogging easy, fun, and accessible to
            everyone.
          </p>
        </section>

        {/* Contact Section */}
        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-purple-600 mb-3">
            📬 Get in Touch
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Have feedback, suggestions, or just want to say hi? We’d love to
            hear from you!
          </p>
          <div className="flex justify-center gap-6 mb-6">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600 text-3xl transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/your-number"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-600 text-3xl transition"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 text-3xl transition"
            >
              <FaFacebookF />
            </a>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-10">
          &copy; {new Date().getFullYear()} Blogify. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default About;

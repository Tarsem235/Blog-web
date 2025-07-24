import React, { useEffect, useState } from "react";

export default function SplashScreen() {
 
  return (
    <div className=" fixed inset-0 bg-gradient-to-b from-white to-gray-100 flex items-center justify-center z-50">
      {/* Spinner with Blogify Inside */}
      <div className="relative w-24 h-24">
        {/* Soft Color Spinning Circle */}
        <div className="absolute inset-0 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>

        {/* Blogify Text in Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-xl font-semibold text-blue-500">Blogify</h1>
        </div>
      </div>
    </div>
  );
}

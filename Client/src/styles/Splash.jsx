import React, { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';

const Splash = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoaded) return null;

  return (
    <div className="relative flex items-center justify-center h-screen bg-black overflow-hidden">
      {/* Glowing Gradient Background Blur */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-fuchsia-600 via-blue-500 to-indigo-700 rounded-full blur-[120px] opacity-20 animate-pulse"></div>

      {/* 3D Rotating Ring */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-24 h-24 animate-spin-slow rounded-full border-t-4 border-purple-600 border-opacity-30">
          <div className="absolute inset-0 border-t-4 border-purple-400 rounded-full animate-spin-fast"></div>
        </div>
      </div>

      {/* Typewriter Logo */}
      <div className="z-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-indigo-400 to-blue-300 drop-shadow-[0_0_1rem_#a855f7]">
          <Typewriter
            words={['BLOGIFY']}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={110}
            deleteSpeed={80}
            delaySpeed={1800}
          />
        </h1>
        <p className="mt-3 text-gray-400 font-light tracking-wider text-sm italic">Next-gen Blogging Experience</p>
      </div>
    </div>
  );
};

export default Splash;

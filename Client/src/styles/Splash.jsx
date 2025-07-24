import React, { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';

const Splash = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoaded) return null;

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin mx-auto mb-6"></div>
        <h1 className="text-3xl font-bold text-white tracking-widest">
          <Typewriter
            words={['BLOGIFY']}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={100}
            deleteSpeed={100}
            delaySpeed={1500}
          />
        </h1>
      </div>
    </div>
  );
};

export default Splash;

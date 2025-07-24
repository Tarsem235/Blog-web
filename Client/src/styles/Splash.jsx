import  { useEffect, useState } from 'react';
import react from 'react'
import { ReactTyped } from 'react-typed';

const Splash = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoaded) return null; // Hide splash after 3s

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin mx-auto mb-6"></div>
        <ReactTyped
          className="text-3xl font-bold text-white tracking-wide"
          strings={["BLOGIFY"]}
          typeSpeed={100}
          backSpeed={100}
          loop={true}
        />
      </div>
    </div>
  );
};

export default Splash;

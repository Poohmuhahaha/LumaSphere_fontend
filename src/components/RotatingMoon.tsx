"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const RotatingMoon = () => {
  const [stars, setStars] = useState<
    {
      top: string;
      left: string;
      width: string;
      height: string;
      animation: string;
    }[]
  >([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 50 }, () => {
        const size = Math.random() * 2 + 1; // 1px - 3px
        const duration = Math.random() * 3 + 2; // 2s - 5s
        const delay = Math.random() * 5; // 0s - 5s

        return {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          animation: `twinkle ${duration}s ease-in-out ${delay}s infinite`,
        };
      });
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((style, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-white opacity-70"
          style={style}
        />
      ))}

      {/* 🌕 Enhanced Moon */}
      <motion.div
        className="absolute top-10 left-10 w-24 h-24 rounded-full shadow-[0_0_60px_10px_rgba(173,216,230,0.6)] border border-blue-100"
        style={{
          background: "radial-gradient(circle at 30% 30%, #ffffff, #cbd5e1, #60a5fa)",
          boxShadow: "0 0 40px 10px rgba(173, 216, 230, 0.2)",
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      >
        {/* Crater effects */}
        <div className="absolute top-5 left-6 w-3 h-3 bg-blue-200 rounded-full opacity-50" />
        <div className="absolute top-12 left-10 w-2 h-2 bg-white rounded-full opacity-30" />
        <div className="absolute top-8 left-16 w-2.5 h-2.5 bg-blue-100 rounded-full opacity-40" />
      </motion.div>

        
    </div>
  );
};

export default RotatingMoon;

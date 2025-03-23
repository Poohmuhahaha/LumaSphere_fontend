"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Star type definition
type Star = {
  top: string;
  left: string;
  width: string;
  height: string;
  animation: string;
};

// Generate stars function
const generateStars = (count: number): Star[] => {
  return Array.from({ length: count }, () => {
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
};

// Star component
const Star = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute rounded-full bg-white opacity-70" style={style} />
);

// Moon component
const Moon = () => (
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
);

function RotatingMoon() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(generateStars(50));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((style, index) => (
        <Star key={index} style={style} />
      ))}
      <Moon />
    </div>
  );
};

export default RotatingMoon;

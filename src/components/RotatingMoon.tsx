"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function RotatingMoon() {
  return (
    <motion.div
      className="absolute top-[-80px] right-[-80px] z-0 opacity-40"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
    >
      <div className="relative w-[300px] h-[300px]">
        {/* Glow behind the moon */}
        <div className="absolute inset-0 rounded-full bg-[#D0BCFF] blur-3xl opacity-20" />

        {/* Moon image */}
        <Image
          src="/MoonPic.png"
          alt="Luna Moon"
          width={400}
          height={400}
          className="rounded-full shadow-[0_0_60px_10px_rgba(208,188,255,0.3)]"
        />
      </div>
      {/* 🌟 ดาวระยิบระยับเต็มท้องฟ้า */}
<div className="absolute inset-0 z-0 pointer-events-none">
  {[...Array(60)].map((_, i) => {
    const size = Math.random() * 2 + 1; // ขนาดดาว 1px - 3px
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const duration = Math.random() * 3 + 2; // 2s - 5s
    const delay = Math.random() * 5;

    return (
      <div
        key={i}
        className="absolute rounded-full bg-white opacity-70"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${top}%`,
          left: `${left}%`,
          animation: `twinkle ${duration}s ease-in-out ${delay}s infinite`,
        }}
      />
    );
  })}
</div>

    </motion.div>
  );
}

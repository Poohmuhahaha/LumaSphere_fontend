// components/RotatingMoon.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function RotatingMoon() {
  return (
    <motion.div
      className="absolute top-[-80px] right-[-80px] z-0 opacity-30"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
    >
      <Image
        src="/luna_moon_pixel.png"
        alt="Luna Moon"
        width={160}
        height={160}
      />
    </motion.div>
  );
}

"use client";
import { useEffect, useState } from "react";

export default function TwinklingStars() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Wait for client-side rendering before displaying stars
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent SSR rendering

  const stars = Array.from({ length: 60 }, (_, i) => {
    const size = Math.random() * 2 + 1;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
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
  });

  return <div className="absolute inset-0 z-0 pointer-events-none">{stars}</div>;
}

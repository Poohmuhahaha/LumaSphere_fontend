"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import LunaPFP from "../../public/LunaPFP.png";

// Component for displaying the recommended article
const RecommendedArticle = ({ recommended }: { recommended: any }) => (
  <div className="mt-3 text-sm text-[#8AB4F8]">
    Luna recommends this article for you:{" "}
    <Link
      href={`/article/${recommended.id}`}
      className="underline hover:text-[#A8CFFF] inline-flex items-center"
    >
      {recommended.title} <ArrowRight className="ml-1 h-4 w-4" />
    </Link>
  </div>
);

// Main component
export default function LunaGreeting({ articles }: { articles: any[] }) {
  const [recommended, setRecommended] = useState<any | null>(null);

  useEffect(() => {
    if (articles.length > 0) {
      const randomArticle = articles[Math.floor(Math.random() * articles.length)];
      setRecommended(randomArticle);
    }
  }, [articles]);

  return (
    <div className="flex items-start gap-4 bg-[#1B1B3A] p-6 rounded-2xl shadow-md mb-12 max-w-3xl mx-auto">
      {/* Avatar ลูน่า */}
      <Image
        src={LunaPFP}
        alt="Luna Avatar"
        width={128}
        height={128}
        className="rounded-full border border-[#8AB4F8] shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
      />

      {/* กล่องคำพูด */}
      <div className="flex-1">
        <p className="text-[#D0BCFF] text-sm mb-1">🌙 Luna says...</p>
        <div className="bg-[#2A2A4A] p-4 rounded-xl text-white text-base leading-relaxed shadow-inner">
          Today, let&apos;s shine the light of wisdom together. ✨

          {recommended && <RecommendedArticle recommended={recommended} />}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LunaGreeting({ articles }: { articles: any[] }) {
  const [recommended, setRecommended] = useState<any | null>(null);

  useEffect(() => {
    if (articles.length > 0) {
      // เลือกบทความแบบสุ่มเพื่อแนะนำ
      const randomArticle = articles[Math.floor(Math.random() * articles.length)];
      setRecommended(randomArticle);
    }
  }, [articles]);

  return (
    <div className="flex items-start gap-4 bg-[#1B1B3A] p-6 rounded-2xl shadow-md mb-12 max-w-3xl mx-auto">
      {/* Avatar ลูน่า */}
      <Image
        src="/lunaPFP.png" // ให้ภูใส่ภาพลูน่าที่อยากใช้ไว้ใน public/
        alt="Luna Avatar"
        width={64}
        height={64}
        className="rounded-full border border-[#8AB4F8] shadow-lg"
      />

      {/* กล่องคำพูด */}
      <div className="flex-1">
        <p className="text-[#D0BCFF] text-sm mb-1">ลูน่ากล่าวว่า…</p>
        <div className="bg-[#2A2A4A] p-4 rounded-xl text-white text-base leading-relaxed shadow-inner">
          วันนี้เรามาส่องแสงแห่งปัญญาไปด้วยกันนะคะ ✨

          {recommended && (
            <div className="mt-3 text-sm text-[#8AB4F8]">
              ลูน่าแนะนำบทความนี้ให้คุณ:{" "}
              <Link
                href={`/article/${recommended.id}`}
                className="underline hover:text-[#A8CFFF] inline-flex items-center"
              >
                {recommended.title} <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

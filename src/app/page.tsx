"use client";

import dynamic from "next/dynamic";

// ใช้ dynamic import เพื่อให้โหลดเฉพาะ client
const RotatingMoon = dynamic(() => import("@/components/RotatingMoon"), {
  ssr: false,
});



import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import LunaGreeting from "@/components/LunaGreeting";
import TwinklingStars from "@/components/TwinklingStars";

async function fetchArticlesFromAPI() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/articles/");
    if (!res.ok) throw new Error("Failed to fetch articles");
    return await res.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticlesFromAPI().then((data) => {
      setArticles(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <main
      className="relative flex min-h-screen flex-col text-white overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top left, #1E1E3F 0%, #0E0E2C 60%, #0B0B20 100%)",
      }}
    >
      {/* 🌟 Twinkling Stars */}
      <TwinklingStars />

      {/* 🌕 Rotating Moon */}
      <RotatingMoon />

      {/* 🪐 Hero Section */}
      <section className="relative z-10 py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#D0BCFF] drop-shadow-lg">
            Welcome to LumaSphere
          </h1>
          <p className="text-xl md:text-2xl text-[#A6A6C6] mb-8 italic">
            "Illuminating Minds, Empowering Connections.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-[#8AB4F8] text-black hover:bg-[#A8CFFF] shadow-md"
          >
            <Link href="/knowledge">
              Explore Knowledge <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* 📚 Featured Articles */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#D0BCFF]">
            Featured Articles
          </h2>

          {!isLoading && <LunaGreeting articles={articles} />}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? [...Array(5)].map((_, i) => (
                  <Card
                    key={i}
                    className="animate-pulse bg-[#1B1B3A] rounded-2xl shadow-inner"
                  >
                    <CardHeader>
                      <div className="h-7 bg-[#2E2E4A] rounded w-3/4"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-[#2E2E4A] rounded mb-2"></div>
                      <div className="h-4 bg-[#2E2E4A] rounded mb-2 w-5/6"></div>
                      <div className="h-4 bg-[#2E2E4A] rounded w-4/6"></div>
                    </CardContent>
                    <CardFooter>
                      <div className="h-4 bg-[#2E2E4A] rounded w-1/4"></div>
                    </CardFooter>
                  </Card>
                ))
              : articles.map((article) => (
                  <Card
                    key={article.id}
                    className="bg-[#1B1B3A] text-white rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-[1.02] flex flex-col h-full"
                  >
                    <CardHeader>
                      <CardTitle className="text-[#D0BCFF] text-xl font-semibold">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-[#E0E0E0] text-sm">{article.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <span className="text-xs text-[#9CA3AF]">
                        {article.category.name}
                      </span>
                      <Button
                        className="bg-[#8AB4F8] hover:bg-[#A8CFFF] text-black text-xs px-3 py-1 rounded-md"
                        size="sm"
                        asChild
                      >
                        <Link href={`/article/${article.id}`}>
                          Read More <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-[#8AB4F8] text-[#8AB4F8] hover:bg-[#1E2A44]"
              asChild
            >
              <Link href="/knowledge">View All Articles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 🌊 Ocean Layer: Multi-layered animated waves */}
      <div className="absolute bottom-0 left-0 w-full h-40 z-0 overflow-hidden bg-transparent">
        <svg
          className="w-[200%] h-full animate-wave-motion-slow absolute bottom-0 left-0 opacity-40"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#0A1A2F"
            d="M0,160L60,165.3C120,171,240,181,360,176C480,171,600,149,720,160C840,171,960,213,1080,208C1200,203,1320,149,1380,122.7L1440,96L1440,320L0,320Z"
          />
        </svg>
        <svg
          className="w-[200%] h-full animate-wave-motion absolute bottom-0 left-0 opacity-60"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#082032"
            d="M0,224L60,229.3C120,235,240,245,360,234.7C480,224,600,192,720,186.7C840,181,960,203,1080,213.3C1200,224,1320,224,1380,224L1440,224L1440,320L0,320Z"
          />
        </svg>
        <svg
          className="w-[200%] h-full animate-wave-motion-fast absolute bottom-0 left-0 opacity-80"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#0E2746"
            d="M0,192L80,186.7C160,181,320,171,480,181.3C640,192,800,224,960,218.7C1120,213,1280,171,1360,149.3L1440,128L1440,320L0,320Z"
          />
        </svg>
      </div>
    </main>
  );
}
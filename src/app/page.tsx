"use client";

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
import RotatingMoon from "@/components/RotatingMoon"; // ✅ Add Moon

// Fetch articles from Django backend
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
    const fetchArticles = async () => {
      const data = await fetchArticlesFromAPI();
      setArticles(data);
      setIsLoading(false);
    };

    fetchArticles();
  }, []);

  return (
    <main
      className="relative flex min-h-screen flex-col text-white overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top left, #1E1E3F 0%, #0E0E2C 60%, #0B0B20 100%)",
      }}
    >
      {/* 🌕 หมุนพระจันทร์เบา ๆ ด้านหลัง */}
      <RotatingMoon />

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#D0BCFF] drop-shadow-lg">
            Welcome to LumaSphere
          </h1>
          <p className="text-xl md:text-2xl text-[#A6A6C6] mb-8 italic">
            "Illuminating Minds, Empowering Connections."
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

      {/* Featured Articles Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#D0BCFF]">
            Featured Articles
          </h2>

          {!isLoading && <LunaGreeting articles={articles} />}

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(5)].map((_, i) => (
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
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
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
          )}

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
    </main>
  );
}

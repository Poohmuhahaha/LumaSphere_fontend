"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for search results
const ALL_ARTICLES = [
  {
    id: 1,
    title: "Introduction to Artificial Intelligence",
    description: "Learn the basics of AI and how it's transforming industries worldwide.",
    category: "AI Basics",
    date: "2023-05-15",
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    description: "Understand the core concepts behind machine learning algorithms.",
    category: "Machine Learning",
    date: "2023-06-02",
  },
  {
    id: 3,
    title: "Natural Language Processing",
    description: "Explore how computers understand and process human language.",
    category: "NLP",
    date: "2023-06-18",
  },
  {
    id: 4,
    title: "Computer Vision Applications",
    description: "Discover how AI is revolutionizing image and video analysis.",
    category: "Computer Vision",
    date: "2023-07-05",
  },
  {
    id: 5,
    title: "Ethical Considerations in AI",
    description: "Explore the ethical challenges and considerations in AI development.",
    category: "AI Ethics",
    date: "2023-07-22",
  },
  {
    id: 6,
    title: "Deep Learning Architectures",
    description: "An in-depth look at neural network architectures and their applications.",
    category: "Deep Learning",
    date: "2023-08-10",
  },
  {
    id: 7,
    title: "Reinforcement Learning",
    description: "Understanding how AI agents learn through interaction with environments.",
    category: "Machine Learning",
    date: "2023-08-28",
  },
  {
    id: 8,
    title: "AI in Healthcare",
    description: "How artificial intelligence is transforming diagnosis and treatment.",
    category: "AI Applications",
    date: "2023-09-15",
  },
  {
    id: 9,
    title: "Generative AI Models",
    description: "Exploring models that can create new content like images and text.",
    category: "Generative AI",
    date: "2023-10-02",
  },
  {
    id: 10,
    title: "AI and Data Privacy",
    description: "Navigating the complex relationship between AI systems and user privacy.",
    category: "AI Ethics",
    date: "2023-10-20",
  },
]

const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof ALL_ARTICLES>([])
  const [isSearching, setIsSearching] = useState(false)

  const performSearch = useCallback((query: string) => {
    setIsSearching(true)

    setTimeout(() => {
      if (!query.trim()) {
        setSearchResults([])
        setIsSearching(false)
        return
      }

      const results = ALL_ARTICLES.filter(
        (article) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.description.toLowerCase().includes(query.toLowerCase()) ||
          article.category.toLowerCase().includes(query.toLowerCase()),
      )

      setSearchResults(results)
      setIsSearching(false)
    }, 300)
  }, [])

  const debouncedSearch = useCallback(debounce(performSearch, 300), [performSearch])

  useEffect(() => {
    debouncedSearch(searchQuery)
  }, [searchQuery, debouncedSearch])

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Search Knowledge Base</h1>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for articles, topics, or keywords..."
            className="pl-10 py-6 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isSearching ? (
          <LoadingSkeleton />
        ) : searchQuery.trim() ? (
          <SearchResults searchResults={searchResults} />
        ) : (
          <StartSearchingMessage />
        )}
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <div className="h-7 bg-muted rounded w-3/4"></div>
          </CardHeader>
          <CardContent>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded mb-2 w-5/6"></div>
            <div className="h-4 bg-muted rounded w-4/6"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function SearchResults({ searchResults }: { searchResults: typeof ALL_ARTICLES }) {
  return (
    <>
      <p className="text-muted-foreground mb-4">
        {searchResults.length === 0
          ? "No results found"
          : `Found ${searchResults.length} result${searchResults.length === 1 ? "" : "s"}`}
      </p>

      <div className="space-y-4">
        {searchResults.map((article) => (
          <Card key={article.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{article.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{article.category}</span>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/article/${article.id}`}>
                  Read More <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}

function StartSearchingMessage() {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium mb-2">Start searching</h3>
      <p className="text-muted-foreground">Type in the search box to find articles in our knowledge base.</p>
    </div>
  )
}

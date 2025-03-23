"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Filter, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Mock data for articles
const ALL_ARTICLES = [
  // ... (same as before)
]

// Extract unique categories
const ALL_CATEGORIES = [...new Set(ALL_ARTICLES.map((article) => article.category))]

export default function KnowledgePage() {
  const [articles, setArticles] = useState(ALL_ARTICLES)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Simulate API fetch
  useEffect(() => {
    const fetchArticles = async () => {
      // Simulate API delay
      setTimeout(() => {
        setArticles(ALL_ARTICLES)
        setIsLoading(false)
      }, 500)
    }

    fetchArticles()
  }, [])

  // Filter articles based on search query and selected categories
  useEffect(() => {
    let filteredArticles = ALL_ARTICLES

    // Filter by search query
    if (searchQuery) {
      filteredArticles = filteredArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filteredArticles = filteredArticles.filter((article) => selectedCategories.includes(article.category))
    }

    setArticles(filteredArticles)
  }, [searchQuery, selectedCategories])

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          clearFilters={clearFilters}
        />
        <MobileFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          clearFilters={clearFilters}
        />
        <MainContent
          isLoading={isLoading}
          articles={articles}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          clearFilters={clearFilters}
        />
      </div>
    </div>
  )
}

function Sidebar({ searchQuery, setSearchQuery, selectedCategories, toggleCategory, clearFilters }) {
  return (
    <aside className="hidden md:block w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-6">
        <SearchSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CategorySection
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          clearFilters={clearFilters}
        />
      </div>
    </aside>
  )
}

function MobileFilter({ searchQuery, setSearchQuery, selectedCategories, toggleCategory, clearFilters }) {
  return (
    <div className="md:hidden flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Knowledge Base</h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Filter articles by category or search term.</SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <SearchSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Separator className="my-4" />
            <CategorySection
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              clearFilters={clearFilters}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

function MainContent({ isLoading, articles, selectedCategories, toggleCategory, clearFilters }) {
  return (
    <main className="flex-1">
      <div className="hidden md:block mb-6">
        <h1 className="text-3xl font-bold mb-2">Knowledge Base</h1>
        <p className="text-muted-foreground">Explore our collection of articles on AI and machine learning.</p>
      </div>

      {selectedCategories.length > 0 && (
        <AppliedFilters selectedCategories={selectedCategories} toggleCategory={toggleCategory} clearFilters={clearFilters} />
      )}

      {isLoading ? (
        <LoadingSkeleton />
      ) : articles.length > 0 ? (
        <ArticlesGrid articles={articles} />
      ) : (
        <NoArticlesFound clearFilters={clearFilters} />
      )}
    </main>
  )
}

function SearchSection({ searchQuery, setSearchQuery }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Search</h2>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search articles..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  )
}

function CategorySection({ selectedCategories, toggleCategory, clearFilters }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Categories</h2>
        {selectedCategories.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear
          </Button>
        )}
      </div>
      <div className="space-y-3">
        {ALL_CATEGORIES.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox
              id={`category-${category}`}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => toggleCategory(category)}
            />
            <label
              htmlFor={`category-${category}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

function AppliedFilters({ selectedCategories, toggleCategory, clearFilters }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {selectedCategories.map((category) => (
        <Badge key={category} variant="secondary" className="flex items-center gap-1">
          {category}
          <button onClick={() => toggleCategory(category)} className="ml-1 rounded-full hover:bg-muted p-0.5">
            <X className="h-3 w-3" />
            <span className="sr-only">Remove {category} filter</span>
          </button>
        </Badge>
      ))}
      <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6">
        Clear all
      </Button>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <div className="h-7 bg-muted rounded w-3/4"></div>
          </CardHeader>
          <CardContent>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded mb-2 w-5/6"></div>
            <div className="h-4 bg-muted rounded w-4/6"></div>
          </CardContent>
          <CardFooter>
            <div className="h-4 bg-muted rounded w-1/4"></div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function ArticlesGrid({ articles }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {articles.map((article) => (
        <Card key={article.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>{article.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">{article.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Badge variant="outline">{article.category}</Badge>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/article/${article.id}`}>
                Read More <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function NoArticlesFound({ clearFilters }) {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium mb-2">No articles found</h3>
      <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria.</p>
      <Button onClick={clearFilters}>Clear Filters</Button>
    </div>
  )
}

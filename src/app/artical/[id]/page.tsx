"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// Mock data for articles
const ALL_ARTICLES = [
  // ... (your articles data)
]

const LoadingSkeleton = () => (
  <div className="container mx-auto py-8 px-4">
    <div className="flex flex-col md:flex-row gap-8">
      <main className="flex-1 animate-pulse">
        <div className="h-10 bg-muted rounded w-3/4 mb-4"></div>
        <div className="flex gap-4 mb-6">
          <div className="h-5 bg-muted rounded w-32"></div>
          <div className="h-5 bg-muted rounded w-32"></div>
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
          <div className="h-4 bg-muted rounded w-4/6"></div>
        </div>
      </main>
      <aside className="md:w-64 flex-shrink-0 animate-pulse">
        <div className="h-7 bg-muted rounded w-3/4 mb-4"></div>
        <div className="space-y-4">
          <div className="h-24 bg-muted rounded"></div>
          <div className="h-24 bg-muted rounded"></div>
          <div className="h-24 bg-muted rounded"></div>
        </div>
      </aside>
    </div>
  </div>
)

const ArticleNotFound = () => (
  <div className="container mx-auto py-16 px-4 text-center">
    <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
    <p className="text-gray-500 mb-8">The article you are looking for does not exist.</p>
    <Button asChild>
      <Link href="/knowledge">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Knowledge Base
      </Link>
    </Button>
  </div>
)

const RelatedArticles = ({ relatedArticles }) => (
  <div>
    <h2 className="text-lg font-semibold mb-4">Related Articles</h2>
    {relatedArticles.length > 0 ? (
      <div className="space-y-4">
        {relatedArticles.map((relatedArticle) => (
          <Card key={relatedArticle.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4">
              <CardTitle className="text-base">{relatedArticle.title}</CardTitle>
            </CardHeader>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href={`/article/${relatedArticle.id}`}>Read Article</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    ) : (
      <p className="text-muted-foreground">No related articles found.</p>
    )}
  </div>
)

const Categories = () => (
  <div>
    <h2 className="text-lg font-semibold mb-4">Categories</h2>
    <div className="flex flex-wrap gap-2">
      {[...new Set(ALL_ARTICLES.map((a) => a.category))].map((category) => (
        <Link href={`/knowledge?category=${category}`} key={category}>
          <Badge variant="secondary" className="cursor-pointer">
            {category}
          </Badge>
        </Link>
      ))}
    </div>
  </div>
)

export default function ArticlePage() {
  const params = useParams()
  const [article, setArticle] = useState<(typeof ALL_ARTICLES)[0] | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<typeof ALL_ARTICLES>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true)

      // Simulate API delay
      setTimeout(() => {
        const foundArticle = ALL_ARTICLES.find((a) => a.id.toString() === params.id)

        if (foundArticle) {
          setArticle(foundArticle)

          // Get related articles
          if (foundArticle.relatedArticles) {
            const related = ALL_ARTICLES.filter(
              (a) => foundArticle.relatedArticles?.includes(a.id) && a.id !== foundArticle.id,
            )
            setRelatedArticles(related)
          }
        }

        setIsLoading(false)
      }, 500)
    }

    if (params.id) {
      fetchArticle()
    }
  }, [params.id])

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (!article) {
    return <ArticleNotFound />
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <main className="flex-1">
          <Button variant="ghost" size="sm" className="mb-4" asChild>
            <Link href="/knowledge">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Knowledge Base
            </Link>
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

          <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              {article.author}
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              {article.date}
            </div>
            <Badge variant="outline">{article.category}</Badge>
          </div>

          <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
        </main>

        <aside className="md:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <RelatedArticles relatedArticles={relatedArticles} />
            <Separator />
            <Categories />
          </div>
        </aside>
      </div>
    </div>
  )
}

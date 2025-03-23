"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Bookmark, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock user data
const USER = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/placeholder.svg?height=100&width=100",
  joinDate: "2023-01-15",
}

// Mock saved articles
const SAVED_ARTICLES = [
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    description: "Understand the core concepts behind machine learning algorithms.",
    category: "Machine Learning",
    date: "2023-06-02",
  },
  {
    id: 5,
    title: "Ethical Considerations in AI",
    description: "Explore the ethical challenges and considerations in AI development.",
    category: "AI Ethics",
    date: "2023-07-22",
  },
  {
    id: 9,
    title: "Generative AI Models",
    description: "Exploring models that can create new content like images and text.",
    category: "Generative AI",
    date: "2023-10-02",
  },
]

export default function ProfilePage() {
  const [user, setUser] = useState(USER)
  const [savedArticles, setSavedArticles] = useState(SAVED_ARTICLES)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate API fetch
  useEffect(() => {
    const fetchUserData = async () => {
      // In a real app, you would fetch from an actual API
      // const response = await fetch('/api/user/profile');
      // const data = await response.json();

      // Simulate API delay
      setTimeout(() => {
        setUser(USER)
        setSavedArticles(SAVED_ARTICLES)
        setIsLoading(false)
      }, 500)
    }

    fetchUserData()
  }, [])

  // Remove saved article
  const removeArticle = (articleId: number) => {
    setSavedArticles(savedArticles.filter((article) => article.id !== articleId))
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="flex items-center gap-4 mb-8">
              <div className="rounded-full bg-muted h-16 w-16"></div>
              <div>
                <div className="h-6 bg-muted rounded w-48 mb-2"></div>
                <div className="h-4 bg-muted rounded w-32"></div>
              </div>
            </div>

            <div className="h-10 bg-muted rounded w-64 mb-8"></div>

            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground">Member since {new Date(user.joinDate).toLocaleDateString()}</p>
          </div>
          <div className="md:ml-auto">
            <Button variant="outline">Edit Profile</Button>
          </div>
        </div>

        <Tabs defaultValue="saved" className="mb-8">
          <TabsList>
            <TabsTrigger value="saved">Saved Articles</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="saved">
            <h2 className="text-xl font-semibold mb-4">Saved Articles</h2>

            {savedArticles.length > 0 ? (
              <div className="space-y-4">
                {savedArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{article.title}</CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArticle(article.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Bookmark className="h-4 w-4 fill-current" />
                          <span className="sr-only">Remove from saved</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{article.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <Badge variant="outline">{article.category}</Badge>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/article/${article.id}`}>
                          Read Article <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <Bookmark className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No saved articles</h3>
                <p className="text-muted-foreground mb-6">Articles you save will appear here.</p>
                <Button asChild>
                  <Link href="/knowledge">Browse Articles</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="activity">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="text-center py-12 border rounded-lg">
              <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No recent activity</h3>
              <p className="text-muted-foreground">Your reading history and interactions will appear here.</p>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                <Separator className="mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <p>{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p>{user.email}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Preferences</h3>
                <Separator className="mb-4" />
                <p className="text-muted-foreground">Notification and display preferences will appear here.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Security</h3>
                <Separator className="mb-4" />
                <Button variant="outline">Change Password</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


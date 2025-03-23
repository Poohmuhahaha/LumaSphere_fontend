"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary backdrop-blur supports-[backdrop-filter]:bg-primary/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground" onClick={closeMenu}>
            <Book className="h-5 w-5 text-accent" />
            <span>LumaSphere</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-accent ${isActive("/") ? "text-accent" : "text-muted"}`}
          >
            Home
          </Link>
          <Link
            href="/knowledge"
            className={`text-sm font-medium transition-colors hover:text-accent ${isActive("/knowledge") ? "text-accent" : "text-muted"}`}
          >
            Knowledge Base
          </Link>
          <Link
            href="/search"
            className={`text-sm font-medium transition-colors hover:text-accent ${isActive("/search") ? "text-accent" : "text-muted"}`}
          >
            Search
          </Link>
          <Link
            href="/profile"
            className={`text-sm font-medium transition-colors hover:text-accent ${isActive("/profile") ? "text-accent" : "text-muted"}`}
          >
            Profile
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/login" className="text-foreground">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/auth/register" className="text-foreground">Register</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5 text-accent" /> : <Menu className="h-5 w-5 text-accent" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-primary border-t">
          <nav className="flex flex-col p-6 gap-6">
            <Link
              href="/"
              className={`text-lg font-medium ${isActive("/") ? "text-accent" : "text-muted"}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/knowledge"
              className={`text-lg font-medium ${isActive("/knowledge") ? "text-accent" : "text-muted"}`}
              onClick={closeMenu}
            >
              Knowledge Base
            </Link>
            <Link
              href="/search"
              className={`text-lg font-medium ${isActive("/search") ? "text-accent" : "text-muted"}`}
              onClick={closeMenu}
            >
              Search
            </Link>
            <Link
              href="/profile"
              className={`text-lg font-medium ${isActive("/profile") ? "text-accent" : "text-muted"}`}
              onClick={closeMenu}
            >
              Profile
            </Link>
            <div className="flex flex-col gap-4 mt-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/auth/login" onClick={closeMenu} className="text-foreground">
                  Login
                </Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/auth/register" onClick={closeMenu} className="text-foreground">
                  Register
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
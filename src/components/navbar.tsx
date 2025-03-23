"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)
  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black bg-[#0f172a]/80 backdrop-blur-md font-pixel shadow-md">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-white text-lg tracking-wide hover:text-blue-400 transition duration-200"
            onClick={closeMenu}
          >
            <Book className="h-5 w-5 text-blue-400" />
            <span>LumaSphere</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className={`${isActive("/") ? "text-blue-400" : "text-slate-400"} hover:text-blue-300 transition`}>
            Home
          </Link>
          <Link href="/knowledge" className={`${isActive("/knowledge") ? "text-blue-400" : "text-slate-400"} hover:text-blue-300 transition`}>
            Knowledge Base
          </Link>
          <Link href="/search" className={`${isActive("/search") ? "text-blue-400" : "text-slate-400"} hover:text-blue-300 transition`}>
            Search
          </Link>
          <Link href="/profile" className={`${isActive("/profile") ? "text-blue-400" : "text-slate-400"} hover:text-blue-300 transition`}>
            Profile
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild></Button>
          <Button size="sm" asChild>
            <Link href="/auth/register" className="text-white">Register</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5 text-blue-400" /> : <Menu className="h-5 w-5 text-blue-400" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-[#0f172a] border-t border-blue-800 font-pixel">
          <nav className="flex flex-col p-6 gap-6 text-white">
            <Link href="/" className={`${isActive("/") ? "text-blue-400" : "text-slate-400"}`} onClick={closeMenu}>
              Home
            </Link>
            <Link href="/knowledge" className={`${isActive("/knowledge") ? "text-blue-400" : "text-slate-400"}`} onClick={closeMenu}>
              Knowledge Base
            </Link>
            <Link href="/search" className={`${isActive("/search") ? "text-blue-400" : "text-slate-400"}`} onClick={closeMenu}>
              Search
            </Link>
            <Link href="/profile" className={`${isActive("/profile") ? "text-blue-400" : "text-slate-400"}`} onClick={closeMenu}>
              Profile
            </Link>

            <div className="flex flex-col gap-4 mt-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/auth/login" onClick={closeMenu} className="text-white hover:text-blue-300">
                  Login
                </Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/auth/register" onClick={closeMenu} className="text-white">
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

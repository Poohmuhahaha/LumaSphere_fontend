  "use client";
  import * as React from "react";
  import { Geist, Geist_Mono } from "next/font/google";
  import "./globals.css";
  import { Navbar } from "@/components/navbar";
  import { ThemeProvider as NextThemesProvider } from "next-themes";
  import type { ThemeProviderProps } from "next-themes";

  export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
  }

  const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });

  const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system" 
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative min-h-screen flex flex-col">
              <Navbar />
              <div className="flex-1">{children}</div>
              <footer className="border-t py-6 md:py-8">
                <div className="container flex flex-col items-center justify-center gap-4 text-center md:flex-row md:gap-6">
                  <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} AI-Powered Knowledge Hub. All rights
                    reserved.
                  </p>
                </div>
              </footer>
            </div>
          </ThemeProvider>
        </body>
      </html>
    );
  }

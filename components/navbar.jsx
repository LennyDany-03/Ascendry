"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, Menu, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import React, { useState, useEffect } from "react"

const products = [
  {
    title: "AI Dev Suite",
    href: "/products/ai-dev-suite",
    description: "Intelligent coding assistance.",
  },
  {
    title: "Website Builder",
    href: "/products/website-builder",
    description: "Stunning sites, no code.",
  },
  {
    title: "Business OS",
    href: "/products/business-os",
    description: "Manage your entire enterprise.",
  },
  {
    title: "E-commerce Pro",
    href: "/products/ecommerce-pro",
    description: "Sell online with ease.",
  },
  {
    title: "Blog Platform",
    href: "/products/blog-platform",
    description: "Share your stories, beautifully.",
  },
  {
    title: "Portfolio Creator",
    href: "/products/portfolio-creator",
    description: "Showcase your best work.",
  },
]

const categories = [
  {
    title: "Business Tools",
    href: "/categories/business-tools",
    description: "Solutions for growth and management.",
  },
  {
    title: "Creative",
    href: "/categories/creative",
    description: "Tools for designers and artists.",
  },
  {
    title: "AI Tools",
    href: "/categories/ai-tools",
    description: "Leverage artificial intelligence.",
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Adjust this value as needed
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-3 px-6 md:px-8 lg:px-12 transition-all duration-300",
        scrolled
          ? "bg-slate-950/70 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex items-center justify-between h-14">
        {/* Left: Brand & Home */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/Ascendry.png" alt="Ascendry Logo" width={36} height={36} className="rounded-full" />
            <span className="text-2xl font-extrabold text-white bg-gradient-to-r from-teal-400 to-aqua-400 bg-clip-text text-transparent">
              Ascendry
            </span>
          </Link>
        </div>

        {/* Center: Main Categories / Products (Desktop) */}
        <div className="flex-grow justify-center hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white hover:text-teal-400 transition-colors text-lg font-medium bg-transparent hover:bg-white/10">
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-slate-900 border border-slate-700 shadow-xl shadow-black/30 p-4 rounded-lg">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {products.map((product) => (
                      <ListItem key={product.title} title={product.title} href={product.href}>
                        {product.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white hover:text-teal-400 transition-colors text-lg font-medium bg-transparent hover:bg-white/10">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-slate-900 border border-slate-700 shadow-xl shadow-black/30 p-4 rounded-lg">
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-br from-teal-600 to-aqua-700 p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-white">All Categories</div>
                          <p className="text-sm leading-tight text-white/80">
                            Explore all tools and templates by category.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    {categories.map((category) => (
                      <ListItem key={category.title} title={category.title} href={category.href}>
                        {category.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-white hover:text-teal-400 transition-colors text-lg font-medium bg-transparent hover:bg-white/10",
                  )}
                >
                  <Link href="/freebies">Freebies</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem></NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right: User Actions (Desktop) */}
        <div className="flex items-center space-x-4 hidden md:flex">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/10 text-base font-medium">
            Login
          </Button>
          <div className="relative inline-flex items-center group">
            <Button
              size="sm"
              aria-label="Sign up"
              className="relative rounded-full px-6 py-2.5 text-sm font-semibold text-white border border-white/15 bg-white/0 hover:bg-white/5 transition-all duration-300 ease-out shadow-none hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] transform-gpu hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-teal-400/50 focus-visible:outline-none"
            >
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-[width] duration-500 ease-out group-hover:w-full motion-reduce:transition-none" />
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10"
              />
              <span className="relative z-10 flex items-center gap-2">
                <span>Sign Up</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transform-none" />
              </span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu (Hamburger Icon) */}
        <div className="md:hidden flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Search className="h-5 w-5" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] sm:w-[320px] bg-slate-950 border-l border-white/10 text-white p-6"
            >
              <div className="flex flex-col space-y-6">
                <Link href="/" className="flex items-center space-x-2 mb-4">
                  <Image src="/Ascendry.png" alt="Ascendry Logo" width={32} height={32} className="rounded-full" />
                  <span className="text-xl font-extrabold text-white bg-gradient-to-r from-teal-400 to-aqua-400 bg-clip-text text-transparent">
                    Ascendry
                  </span>
                </Link>
                <Link href="/" className="text-lg font-medium hover:text-teal-400 transition-colors">
                  Home
                </Link>
                <div className="flex flex-col space-y-3">
                  <span className="text-lg font-medium text-slate-300">Products</span>
                  <ul className="ml-4 space-y-2">
                    {products.map((product) => (
                      <li key={product.title}>
                        <Link
                          href={product.href}
                          className="text-slate-400 hover:text-teal-400 transition-colors text-base"
                        >
                          {product.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col space-y-3">
                  <span className="text-lg font-medium text-slate-300">Categories</span>
                  <ul className="ml-4 space-y-2">
                    {categories.map((category) => (
                      <li key={category.title}>
                        <Link
                          href={category.href}
                          className="text-slate-400 hover:text-teal-400 transition-colors text-base"
                        >
                          {category.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/freebies" className="text-lg font-medium hover:text-teal-400 transition-colors">
                  Freebies
                </Link>
                <Link href="/blog" className="text-lg font-medium hover:text-teal-400 transition-colors">
                  Blog / Guides
                </Link>
                <div className="pt-4 border-t border-white/10 flex flex-col space-y-3">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-white/10 text-base font-medium"
                  >
                    Login
                  </Button>
                  <div className="relative inline-flex w-full items-center group">
                    <Button
                      size="lg"
                      aria-label="Sign up"
                      className="relative w-full rounded-full px-6 py-3 text-base font-semibold text-white border border-white/15 bg-white/0 hover:bg-white/5 transition-all duration-300 ease-out shadow-none hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] transform-gpu hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-teal-400/50 focus-visible:outline-none"
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
                      >
                        <span className="absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-[width] duration-500 ease-out group-hover:w-full motion-reduce:transition-none" />
                      </span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10"
                      />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <span>Sign Up</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transform-none" />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-800 hover:text-teal-400 focus:bg-slate-800 focus:text-teal-400",
            className,
          )}
          {...props}
        >
          <div className="text-base font-medium leading-none text-white">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-slate-400">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

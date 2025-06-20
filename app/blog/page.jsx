"use client"

import { useState } from "react"
import Navbar from "../../components/navbar.jsx"
import Footer from "../../components/footer.jsx"
import InteractiveBackground from "../../components/interactive-background"
import BlogCard from "../../components/blog-card.jsx"
import { Search, Filter, BookOpen, Users, TrendingUp, Clock } from "lucide-react"

const BlogPage = () => {
  const [selectedTag, setSelectedTag] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const blogPosts = [
    {
      id: "building-novapay-case-study",
      title: "Building NovaPay: From Scratch to Production",
      excerpt:
        "Learn how I built NovaPay with Supabase, React, and Vercel. Includes deployment tips, challenges faced, and lessons learned during development.",
      date: "2024-12-15",
      tags: ["React", "Supabase", "FinanceApp", "CaseStudy"],
      readTime: "8 min read",
      thumbnail: "/placeholder.svg?height=200&width=400",
      featured: true,
    },
    {
      id: "church-ministry-website-guide",
      title: "Church Ministry Website with Media Gallery",
      excerpt:
        "Complete guide to building a modern church website with event management, donation integration, and media galleries using Next.js and Sanity CMS.",
      date: "2024-12-10",
      tags: ["NextJS", "SanityCMS", "WebDev", "CaseStudy"],
      readTime: "12 min read",
      thumbnail: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "supabase-vs-firebase-comparison",
      title: "Supabase vs Firebase for Indie Developers",
      excerpt:
        "Detailed comparison of Supabase and Firebase from an indie developer's perspective. Pricing, features, developer experience, and real-world usage scenarios.",
      date: "2024-12-05",
      tags: ["Supabase", "Firebase", "Backend", "Opinion"],
      readTime: "10 min read",
      thumbnail: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "tamil-english-chatbot-gemini",
      title: "Building a Tamil + English Chatbot using Gemini",
      excerpt:
        "Step-by-step guide to creating a multilingual healthcare chatbot that supports both Tamil and English using Google's Gemini AI and natural language processing.",
      date: "2024-11-28",
      tags: ["AI", "Gemini", "NLP", "Python", "Tutorial"],
      readTime: "15 min read",
      thumbnail: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "gumroad-student-developer-guide",
      title: "Earning via Gumroad as a Student Developer",
      excerpt:
        "How I started selling digital products on Gumroad as a student. Tips for pricing, marketing, product creation, and building a sustainable income stream.",
      date: "2024-11-20",
      tags: ["Gumroad", "Monetization", "StudentLife", "Guide"],
      readTime: "7 min read",
      thumbnail: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "clubsphere-hackathon-story",
      title: "How We Built ClubSphere: College Hackathon Project",
      excerpt:
        "The story behind ClubSphere - from hackathon idea to production-ready college club management system. Team dynamics, technical challenges, and key learnings.",
      date: "2024-11-15",
      tags: ["Hackathon", "TeamWork", "React", "Story"],
      readTime: "6 min read",
      thumbnail: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "react-performance-optimization",
      title: "React Performance Optimization: Real-World Tips",
      excerpt:
        "Practical React performance optimization techniques I've learned from building production apps. Code splitting, memoization, and bundle optimization strategies.",
      date: "2024-11-08",
      tags: ["React", "Performance", "Optimization", "Tutorial"],
      readTime: "11 min read",
      thumbnail: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "tailwind-css-component-library",
      title: "Building a Reusable Component Library with Tailwind",
      excerpt:
        "How to create and maintain a scalable component library using Tailwind CSS. Design tokens, component variants, and documentation best practices.",
      date: "2024-11-01",
      tags: ["TailwindCSS", "ComponentLibrary", "DesignSystem", "Tutorial"],
      readTime: "9 min read",
      thumbnail: "/placeholder.svg?height=200&width=400",
    },
  ]

  const allTags = ["all", ...new Set(blogPosts.flatMap((post) => post.tags))]

  const filteredPosts =
    selectedTag === "all"
      ? blogPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
        )
      : blogPosts.filter(
          (post) =>
            post.tags.includes(selectedTag) &&
            (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))),
        )

  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <InteractiveBackground />
      <Navbar />

      {/* Floating Particles - Reduced */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Compact Hero Section */}
      <section className="pt-24 pb-12 relative">
        <br />
        {/* Smaller Geometric Shapes */}
        <div className="absolute top-16 left-10 w-12 h-12 border border-blue-500/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-20 right-20 w-10 h-10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rotate-12 animate-pulse"></div>
        <div className="absolute bottom-8 left-1/4 w-8 h-8 border border-pink-500/30 rounded-full animate-bounce"></div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          {/* Compact Welcome Badge */}
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full mb-6 group hover:border-blue-500/40 transition-all duration-300">
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-medium text-sm">
                Tech Insights & Stories
              </span>
            </div>
          </div>

          {/* Compact Main Heading */}
          <h1 className="text-4xl md:text-6xl font-black mb-6 relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">
              READ.
            </span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              LEARN.
            </span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-white">
              ASCEND.
            </span>
          </h1>

          <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Dive deep into development insights, tutorials, and real-world project stories.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Code smarter, build faster, grow stronger.
            </span>
          </p>

          {/* Compact CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => document.getElementById("featured-post")?.scrollIntoView({ behavior: "smooth" })}
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Read Featured</span>
              </span>
            </button>

            <button
              onClick={() => document.getElementById("all-posts")?.scrollIntoView({ behavior: "smooth" })}
              className="group px-6 py-3 border border-gray-600 text-white font-semibold rounded-xl hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Browse All</span>
              </span>
            </button>
          </div>

          {/* Compact Stats Grid */}
          <div className="grid grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              {
                icon: BookOpen,
                number: `${blogPosts.length}+`,
                label: "Articles",
                color: "from-blue-500 to-purple-500",
              },
              { icon: Users, number: "10K+", label: "Readers", color: "from-purple-500 to-pink-500" },
              { icon: TrendingUp, number: "50+", label: "Examples", color: "from-pink-500 to-blue-500" },
              { icon: Clock, number: "100+", label: "Hours", color: "from-blue-500 to-pink-500" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group text-center p-4 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`w-8 h-8 mx-auto mb-3 rounded-lg bg-gradient-to-r ${stat.color} p-2 group-hover:rotate-12 transition-transform duration-300`}
                >
                  <stat.icon className="w-full h-full text-white" />
                </div>
                <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compact Search & Filter Section */}
      <section className="py-8 bg-gradient-to-b from-gray-950/50 to-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.05),transparent_70%)]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full mb-4">
              <Search className="w-3 h-3 text-blue-400" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-medium text-xs">
                Find Your Next Read
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-4">
              Explore by Topic
            </h2>
          </div>

          {/* Compact Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 focus:bg-gray-900/70 transition-all duration-300 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Compact Tags Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {allTags.slice(0, 8).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`group px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 text-sm ${
                  selectedTag === tag
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                    : "bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:border-gray-600/50 hover:text-white"
                }`}
              >
                {tag === "all" ? "All" : `#${tag}`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Compact Featured Post */}
      {featuredPost && (
        <section id="featured-post" className="py-12 bg-black relative">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-pink-500/10 to-blue-500/10 backdrop-blur-sm border border-pink-500/20 rounded-full mb-4">
                <TrendingUp className="w-3 h-3 text-pink-400" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400 font-medium text-xs">
                  Featured Article
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                Latest Deep Dive
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="group bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-600/50 transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:shadow-blue-500/10">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Compact Image */}
                  <div className="relative h-48 lg:h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
                    <img
                      src={featuredPost.thumbnail || "/placeholder.svg"}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1 bg-gradient-to-r from-pink-500 to-blue-500 text-white text-xs font-bold rounded-full">
                        FEATURED
                      </div>
                    </div>
                  </div>

                  {/* Compact Content */}
                  <div className="p-6 lg:p-8 flex flex-col justify-center">
                    <div className="flex items-center space-x-3 mb-4 text-xs text-gray-400">
                      <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>

                    <h3 className="text-xl lg:text-2xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-500 leading-tight">
                      {featuredPost.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {featuredPost.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 text-xs rounded-lg"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={`/blog/${featuredPost.id}`}
                      className="group/btn relative px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 inline-flex items-center justify-center"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative text-sm">Read Full Article</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Compact All Posts Grid */}
      <section id="all-posts" className="py-12 bg-gradient-to-b from-black to-gray-950 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full mb-4">
              <BookOpen className="w-3 h-3 text-blue-400" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-medium text-xs">
                All Articles
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-4">
              Knowledge Base
            </h2>
            <p className="text-sm text-gray-400">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
              {selectedTag !== "all" && ` in #${selectedTag}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {regularPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">No posts found</h3>
              <p className="text-gray-400 mb-6 text-sm max-w-md mx-auto">
                Try adjusting your search terms or selecting a different category.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setSelectedTag("all")
                    setSearchQuery("")
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:scale-105 transition-all duration-300 text-sm"
                >
                  Show All Posts
                </button>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-2 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 font-medium rounded-xl transition-all duration-300 text-sm"
                >
                  Clear Search
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Compact Newsletter Section */}
      <section className="py-12 bg-gradient-to-br from-gray-950 via-black to-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]"></div>

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 relative overflow-hidden group hover:border-gray-600/50 transition-all duration-500">
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full mb-6">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-medium text-xs">
                  Stay Updated
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                  Never Miss
                </span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  An Update
                </span>
              </h2>

              <p className="text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
                Get the latest tech insights and tutorials delivered to your inbox.
                <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-sm">
                  Join 10,000+ developers already subscribed.
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto mb-6">
                <div className="relative flex-1 group/input">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 focus:bg-gray-900/70 transition-all duration-300 placeholder-gray-400 text-sm"
                  />
                </div>
                <button className="group/btn relative px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                  <span className="relative text-sm">Subscribe</span>
                </button>
              </div>

              <p className="text-gray-500 text-xs">No spam, unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default BlogPage

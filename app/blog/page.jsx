"use client"

import { useState } from "react"
import Navbar from "../../components/navbar.jsx"
import Footer from "../../components/footer.jsx"
import InteractiveBackground from "../../components/interactive-background"
import BlogCard from "../../components/blog-card.jsx"

const BlogPage = () => {
  const [selectedTag, setSelectedTag] = useState("all")

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

  const filteredPosts = selectedTag === "all" ? blogPosts : blogPosts.filter((post) => post.tags.includes(selectedTag))

  return (
    <div className="min-h-screen bg-black text-white relative">
      <InteractiveBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        {/* Geometric Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-white/10 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/5 rotate-12 animate-pulse"></div>
        <div className="absolute bottom-10 left-1/4 w-12 h-12 border border-blue-900/40 rounded-full animate-bounce"></div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 rounded-full border border-gray-800 mb-8">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300 font-medium">Tech Insights & Stories</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 relative">
            <span className="text-white">ASCENDRY</span>
            <br />
            <span className="text-blue-500">BLOG</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            Insights, guides, and stories from my dev journey — code smarter, build faster.
          </p>

          {/* Blog Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { number: `${blogPosts.length}+`, label: "Articles Published" },
              { number: "10K+", label: "Monthly Readers" },
              { number: "50+", label: "Code Examples" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-black text-blue-500 mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tags Filter */}
      <section className="py-10 bg-gray-950 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center">
            <div className="flex flex-wrap gap-3 justify-center">
              {allTags.slice(0, 8).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedTag === tag
                      ? "bg-blue-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {tag === "all" ? "All Posts" : `#${tag}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-black relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-20">📝</div>
              <h3 className="text-2xl font-bold text-white mb-4">No posts found</h3>
              <p className="text-gray-400 mb-8">Try selecting a different tag or check back later for new content.</p>
              <button
                onClick={() => setSelectedTag("all")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Show All Posts
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-950 relative">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="bg-black border border-gray-800 rounded-2xl p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,64,175,0.1),transparent_70%)]"></div>

            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-6 text-white">Stay Updated</h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Get the latest tech insights, tutorials, and project updates delivered to your inbox.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300"
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105">
                  Subscribe
                </button>
              </div>

              <p className="text-gray-500 text-sm mt-4">No spam, unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default BlogPage

"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Navbar from "../../../components/navbar.jsx"
import Footer from "../../../components/footer.jsx"
import InteractiveBackground from "../../../components/interactive-background"
import BlogCard from "../../../components/blog-card.jsx"
import Link from "next/link"

const BlogDetailPage = () => {
  const params = useParams()
  const slug = params.slug
  const [readingProgress, setReadingProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("")
  const [showTOC, setShowTOC] = useState(false)

  // Reading progress calculation
  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setReadingProgress(progress)
    }

    window.addEventListener("scroll", updateReadingProgress)
    return () => window.removeEventListener("scroll", updateReadingProgress)
  }, [])

  // Sample blog posts data
  const blogPosts = {
    "building-novapay-case-study": {
      id: "building-novapay-case-study",
      title: "Building NovaPay: From Scratch to Production",
      excerpt:
        "Learn how I built NovaPay with Supabase, React, and Vercel. Includes deployment tips, challenges faced, and lessons learned during development.",
      date: "2024-12-15",
      tags: ["React", "Supabase", "FinanceApp", "CaseStudy"],
      readTime: "12 min read",
      author: "Lenny",
      thumbnail: "/placeholder.svg?height=600&width=1200",
      content: `
# Building NovaPay: From Scratch to Production

NovaPay is a personal finance tracking tool that helps you manage your budget by capturing and analyzing your UPI payments. With real-time expense logging and intuitive insights, NovaPay makes it easy to stay on top of your spending and take control of your finances.

## The Problem

In today's digital-first world, UPI payments have become the norm for most transactions in India. However, tracking these micro-transactions across multiple apps and platforms became a nightmare for budget-conscious individuals like myself. 

**Key Pain Points I Identified:**
- Scattered transaction data across multiple UPI apps
- No unified view of spending patterns
- Lack of real-time budget tracking
- Manual categorization of expenses
- No predictive insights for future spending

## The Solution: NovaPay

I decided to build NovaPay as a comprehensive solution that would:
- **Automatically capture** UPI transaction data
- **Categorize expenses** using AI-powered classification
- **Provide real-time insights** into spending patterns
- **Set budget limits** and send alerts
- **Generate reports** for better financial planning

## Technical Architecture

### Tech Stack Selection

After evaluating multiple options, I settled on this modern tech stack:

\`\`\`javascript
// Frontend
- React 18 with Hooks
- Vite for blazing-fast development
- Tailwind CSS for styling
- Chart.js for data visualization
- React Query for state management

// Backend & Database
- Supabase (PostgreSQL + Auth + Real-time)
- Row Level Security (RLS) for data protection

// Deployment & Infrastructure
- Vercel for frontend hosting
- Supabase for backend infrastructure
- GitHub Actions for CI/CD
\`\`\`

### Database Schema Design

The core of NovaPay revolves around a well-structured database schema:

\`\`\`sql
-- Users table (handled by Supabase Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  transaction_type TEXT CHECK (transaction_type IN ('debit', 'credit')),
  upi_ref_id TEXT UNIQUE,
  merchant_name TEXT,
  transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

## Key Features Implementation

### 1. Real-time Transaction Capture

One of the biggest challenges was capturing UPI transactions in real-time. I implemented a solution using SMS parsing and manual entry:

\`\`\`javascript
// Transaction parsing utility
const parseUPITransaction = (smsText) => {
  const patterns = {
    amount: /Rs\.?\s*(\d+(?:,\d+)*(?:\.\d{2})?)/i,
    merchant: /(?:to|at)\s+([A-Za-z0-9\s]+?)(?:\s+on|\s+UPI)/i,
    refId: /UPI Ref No\s*:?\s*(\w+)/i,
    date: /(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4})/
  };

  return {
    amount: smsText.match(patterns.amount)?.[1]?.replace(/,/g, ''),
    merchant: smsText.match(patterns.merchant)?.[1]?.trim(),
    refId: smsText.match(patterns.refId)?.[1],
    date: smsText.match(patterns.date)?.[1]
  };
};
\`\`\`

## Challenges Faced & Solutions

### 1. Real-time Data Synchronization

**Challenge:** Ensuring all devices show updated transaction data immediately.

**Solution:** Leveraged Supabase's real-time subscriptions:

\`\`\`javascript
useEffect(() => {
  const subscription = supabase
    .channel('transactions')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'transactions' },
      (payload) => {
        queryClient.invalidateQueries(['transactions']);
      }
    )
    .subscribe();

  return () => subscription.unsubscribe();
}, []);
\`\`\`

## Results & Impact

After 3 months of development and 2 months in production:

### 📊 **Key Metrics:**
- **500+ transactions** processed
- **95% accuracy** in expense categorization
- **40% reduction** in manual expense tracking time
- **100% uptime** since launch

## Key Learnings

### 1. **Start Simple, Scale Smart**
I initially over-engineered the solution. Starting with an MVP and iterating based on user feedback was much more effective.

### 2. **Database Design is Crucial**
Spending extra time on database schema design saved countless hours during development and scaling.

## Conclusion

Building NovaPay was an incredible learning experience that taught me the importance of user-centric design, robust architecture, and iterative development.

**Want to try NovaPay?** Check out the [live demo](https://novapay-demo.vercel.app) or explore the [source code](https://github.com/ascendry/novapay) on GitHub.
      `,
      tableOfContents: [
        { id: "the-problem", title: "The Problem", level: 2 },
        { id: "the-solution", title: "The Solution: NovaPay", level: 2 },
        { id: "technical-architecture", title: "Technical Architecture", level: 2 },
        { id: "tech-stack", title: "Tech Stack Selection", level: 3 },
        { id: "database-schema", title: "Database Schema Design", level: 3 },
        { id: "key-features", title: "Key Features Implementation", level: 2 },
        { id: "challenges", title: "Challenges Faced & Solutions", level: 2 },
        { id: "results", title: "Results & Impact", level: 2 },
        { id: "learnings", title: "Key Learnings", level: 2 },
        { id: "conclusion", title: "Conclusion", level: 2 },
      ],
    },
  }

  const currentPost = blogPosts[slug]

  const relatedPosts = [
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
      id: "gumroad-student-developer-guide",
      title: "Earning via Gumroad as a Student Developer",
      excerpt:
        "How I started selling digital products on Gumroad as a student. Tips for pricing, marketing, product creation, and building a sustainable income stream.",
      date: "2024-11-20",
      tags: ["Gumroad", "Monetization", "StudentLife", "Guide"],
      readTime: "7 min read",
      thumbnail: "/placeholder.svg?height=200&width=400",
    },
  ]

  if (!currentPost) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-8 opacity-20">📝</div>
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
          >
            <span>←</span>
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>
    )
  }

  // Copy to clipboard function
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  // Enhanced content renderer with modern styling
  const renderContent = (content) => {
    return content.split("\n").map((line, index) => {
      // Headers with modern styling
      if (line.startsWith("# ")) {
        return (
          <h1
            key={index}
            className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-8 mt-12 leading-tight"
          >
            {line.substring(2)}
          </h1>
        )
      }
      if (line.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-3xl md:text-4xl font-bold text-white mb-6 mt-12 relative group"
            id={line
              .substring(3)
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")}
          >
            <span className="absolute -left-8 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              #
            </span>
            {line.substring(3)}
          </h2>
        )
      }
      if (line.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-2xl md:text-3xl font-bold text-blue-400 mb-4 mt-8 relative group"
            id={line
              .substring(4)
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")}
          >
            <span className="absolute -left-6 text-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              ##
            </span>
            {line.substring(4)}
          </h3>
        )
      }

      // Enhanced code blocks
      if (line.startsWith("```")) {
        const language = line.substring(3)
        let codeContent = ""
        let i = index + 1
        while (i < content.split("\n").length && !content.split("\n")[i].startsWith("```")) {
          codeContent += content.split("\n")[i] + "\n"
          i++
        }
        return (
          <div key={index} className="my-8 group">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-4 flex items-center justify-between border-b border-gray-600/50">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-300 text-sm font-medium">{language || "code"}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(codeContent.trim())}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded-lg text-sm font-medium"
                >
                  Copy
                </button>
              </div>
              <pre className="p-6 text-sm text-gray-300 overflow-x-auto leading-relaxed">
                <code className="font-mono">{codeContent.trim()}</code>
              </pre>
            </div>
          </div>
        )
      }

      // Enhanced inline code
      if (line.includes("`") && !line.startsWith("```")) {
        const parts = line.split("`")
        return (
          <p key={index} className="text-gray-300 mb-6 leading-relaxed text-lg">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <code
                  key={i}
                  className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 py-1 rounded-lg text-base font-mono border border-blue-500/30"
                >
                  {part}
                </code>
              ) : (
                part
              ),
            )}
          </p>
        )
      }

      // Enhanced bold text
      if (line.includes("**")) {
        const parts = line.split("**")
        return (
          <p key={index} className="text-gray-300 mb-6 leading-relaxed text-lg">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <strong
                  key={i}
                  className="text-white font-bold bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-1 rounded"
                >
                  {part}
                </strong>
              ) : (
                part
              ),
            )}
          </p>
        )
      }

      // Enhanced lists
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="text-gray-300 mb-3 ml-8 text-lg relative">
            <span className="absolute -left-6 text-blue-500">•</span>
            {line.substring(2)}
          </li>
        )
      }

      // Enhanced blockquotes
      if (line.startsWith("> ")) {
        return (
          <blockquote
            key={index}
            className="border-l-4 border-gradient-to-b from-blue-500 to-purple-500 pl-6 py-4 my-8 bg-gradient-to-r from-blue-500/5 to-purple-500/5 italic text-gray-300 text-lg rounded-r-xl"
          >
            {line.substring(2)}
          </blockquote>
        )
      }

      // Enhanced horizontal rule
      if (line.trim() === "---") {
        return (
          <div key={index} className="my-12 flex items-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            <div className="px-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          </div>
        )
      }

      // Empty lines
      if (line.trim() === "") {
        return <div key={index} className="mb-6"></div>
      }

      // Enhanced regular paragraphs
      return (
        <p key={index} className="text-gray-300 mb-6 leading-relaxed text-lg">
          {line}
        </p>
      )
    })
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <InteractiveBackground />
      <Navbar />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      {/* Floating Table of Contents */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
        <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 max-w-xs shadow-2xl">
          <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">Table of Contents</h3>
          <nav className="space-y-2">
            {currentPost.tableOfContents?.map((item, index) => (
              <a
                key={index}
                href={`#${item.id}`}
                className={`block text-sm transition-all duration-300 hover:text-blue-400 ${
                  item.level === 3 ? "ml-4 text-gray-500" : "text-gray-400"
                }`}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black to-purple-900/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-3 text-sm">
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-1"
              >
                <span>🏠</span>
                <span>Home</span>
              </Link>
              <span className="text-gray-600">→</span>
              <Link
                href="/blog"
                className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-1"
              >
                <span>📝</span>
                <span>Blog</span>
              </Link>
              <span className="text-gray-600">→</span>
              <span className="text-blue-400 font-medium">{currentPost.title}</span>
            </div>
          </nav>

          {/* Article Header */}
          <header className="text-center mb-12">
            {/* Tags */}
            <div className="flex items-center justify-center flex-wrap gap-3 mb-8">
              {currentPost.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 text-sm rounded-full font-medium backdrop-blur-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100 mb-8 leading-tight">
              {currentPost.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center justify-center flex-wrap gap-6 text-gray-400 mb-12">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg font-bold">L</span>
                </div>
                <div className="text-left">
                  <div className="text-white font-medium">{currentPost.author}</div>
                  <div className="text-gray-500 text-sm">Author</div>
                </div>
              </div>
              <div className="w-px h-12 bg-gray-700"></div>
              <div className="text-center">
                <div className="text-white font-medium">
                  {new Date(currentPost.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="text-gray-500 text-sm">Published</div>
              </div>
              <div className="w-px h-12 bg-gray-700"></div>
              <div className="text-center">
                <div className="text-white font-medium">{currentPost.readTime}</div>
                <div className="text-gray-500 text-sm">Read time</div>
              </div>
            </div>

            {/* Header Image */}
            <div className="relative rounded-3xl overflow-hidden border border-gray-700/50 shadow-2xl group">
              <img
                src={currentPost.thumbnail || "/placeholder.svg"}
                alt={currentPost.title}
                className="w-full h-64 md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </header>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 to-black"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="prose prose-xl prose-invert max-w-none">{renderContent(currentPost.content)}</div>

          {/* Article Footer */}
          <div className="mt-16 pt-12 border-t border-gray-800">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl font-bold">L</span>
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold">Written by {currentPost.author}</h3>
                  <p className="text-gray-400">
                    Full-stack developer passionate about building amazing digital experiences
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="#contact"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/blog"
                  className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
                >
                  More Articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-6">
              Continue Reading
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore more insights and tutorials from my development journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/blog"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <span>View All Posts</span>
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default BlogDetailPage

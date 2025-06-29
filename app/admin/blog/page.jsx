"use client"

import { useState, useEffect } from "react"
import { supabase } from "../../../lib/supabaseClient"
import Navbar from "../../../components/navbar.jsx"
import Footer from "../../../components/footer.jsx"
import InteractiveBackground from "../../../components/interactive-background"
import ConfirmationModal from "../../../components/confirmation-modal"
import { useToast } from "../../../components/toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Save,
  X,
  ImageIcon,
  FileText,
  Tag,
  Eye,
  Home,
  Shield,
  BookOpen,
  TrendingUp,
  Users,
  Star,
  Globe,
  Zap,
  Upload,
} from "lucide-react"

const AdminBlogPage = () => {
  const [user, setUser] = useState(null)
  const [adminData, setAdminData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState([])
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showForm, setShowForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, blogId: null, blogTitle: "" })
  const router = useRouter()
  const toast = useToast()

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    detailedDescription: "",
    category: "",
    tags: [],
    readTime: "",
    author: "Lenny",
    thumbnail: "",
    contentImage1: "",
    contentImage2: "",
    featured: false,
    published: true,
  })

  // Sample blog data
  const sampleBlogs = [
    {
      id: "building-novapay-case-study",
      title: "Building NovaPay: From Scratch to Production",
      excerpt:
        "Learn how I built NovaPay with Supabase, React, and Vercel. Includes deployment tips, challenges faced, and lessons learned during development.",
      content: "Complete guide to building a modern finance app...",
      detailedDescription:
        "This comprehensive case study walks through the entire development process of NovaPay, from initial concept to production deployment. We'll cover architecture decisions, technology choices, challenges faced, and lessons learned throughout the journey.",
      category: "Case Study",
      tags: ["React", "Supabase", "FinanceApp", "CaseStudy"],
      readTime: "12 min read",
      author: "Lenny",
      thumbnail: "/placeholder.svg?height=400&width=600",
      contentImage1: "/placeholder.svg?height=300&width=500",
      contentImage2: "/placeholder.svg?height=300&width=500",
      featured: true,
      published: true,
      views: 1247,
      likes: 89,
      date: "2024-12-15",
    },
    {
      id: "supabase-vs-firebase-comparison",
      title: "Supabase vs Firebase for Indie Developers",
      excerpt:
        "Detailed comparison of Supabase and Firebase from an indie developer's perspective. Pricing, features, developer experience, and real-world usage scenarios.",
      content: "In-depth comparison of two popular backend solutions...",
      detailedDescription:
        "A thorough analysis comparing Supabase and Firebase across multiple dimensions including pricing, features, developer experience, scalability, and real-world performance in production applications.",
      category: "Comparison",
      tags: ["Supabase", "Firebase", "Backend", "Opinion"],
      readTime: "10 min read",
      author: "Lenny",
      thumbnail: "/placeholder.svg?height=400&width=600",
      contentImage1: "/placeholder.svg?height=300&width=500",
      contentImage2: "/placeholder.svg?height=300&width=500",
      featured: false,
      published: true,
      views: 892,
      likes: 67,
      date: "2024-12-05",
    },
    {
      id: "react-performance-optimization",
      title: "React Performance Optimization: Real-World Tips",
      excerpt:
        "Practical React performance optimization techniques I've learned from building production apps. Code splitting, memoization, and bundle optimization strategies.",
      content: "Performance optimization techniques for React applications...",
      detailedDescription:
        "Learn advanced React performance optimization techniques through real-world examples and practical implementations. This guide covers everything from basic optimizations to advanced patterns used in production applications.",
      category: "Tutorial",
      tags: ["React", "Performance", "Optimization", "Tutorial"],
      readTime: "11 min read",
      author: "Lenny",
      thumbnail: "/placeholder.svg?height=400&width=600",
      contentImage1: "/placeholder.svg?height=300&width=500",
      contentImage2: "/placeholder.svg?height=300&width=500",
      featured: false,
      published: true,
      views: 1456,
      likes: 123,
      date: "2024-11-08",
    },
  ]

  const categories = ["all", "Tutorial", "Case Study", "Comparison", "Opinion", "Guide", "News"]

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          router.push("/admin/login")
          return
        }

        setUser(session.user)

        const { data: adminRecord, error } = await supabase
          .from("admin_access")
          .select("*")
          .eq("email", session.user.email)
          .eq("is_active", true)
          .single()

        if (error || !adminRecord) {
          console.error("Admin access denied:", error)
          await supabase.auth.signOut()
          router.push("/admin/login")
          return
        }

        setAdminData(adminRecord)
        setBlogs(sampleBlogs)
        setFilteredBlogs(sampleBlogs)
      } catch (error) {
        console.error("Auth check error:", error)
        router.push("/admin/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  // Filter blogs based on search and category
  useEffect(() => {
    let filtered = blogs

    if (selectedCategory !== "all") {
      filtered = filtered.filter((blog) => blog.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    setFilteredBlogs(filtered)
  }, [blogs, searchQuery, selectedCategory])

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      detailedDescription: "",
      category: "",
      tags: [],
      readTime: "",
      author: "Lenny",
      thumbnail: "",
      contentImage1: "",
      contentImage2: "",
      featured: false,
      published: true,
    })
    setEditingBlog(null)
  }

  const handleImageUpload = async (file, fieldName) => {
    if (!file) return

    try {
      // Create a temporary URL for preview
      const imageUrl = URL.createObjectURL(file)
      setFormData((prev) => ({ ...prev, [fieldName]: imageUrl }))

      // Here you would typically upload to Supabase Storage
      // const { data, error } = await supabase.storage
      //   .from('blog-images')
      //   .upload(`${Date.now()}-${file.name}`, file)

      toast.success("Image uploaded successfully!")
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Failed to upload image")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormLoading(true)

    try {
      // Validate required fields
      if (!formData.title || !formData.excerpt || !formData.content || !formData.category) {
        toast.error("Please fill in all required fields")
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (editingBlog) {
        // Update existing blog
        const updatedBlogs = blogs.map((blog) =>
          blog.id === editingBlog.id ? { ...blog, ...formData, id: editingBlog.id, date: blog.date } : blog,
        )
        setBlogs(updatedBlogs)
        toast.success("Blog post updated successfully!")
      } else {
        // Create new blog
        const newBlog = {
          ...formData,
          id: `blog-${Date.now()}`,
          date: new Date().toISOString().split("T")[0],
          views: 0,
          likes: 0,
        }
        setBlogs([newBlog, ...blogs])
        toast.success("Blog post created successfully!")
      }

      setShowForm(false)
      resetForm()
    } catch (error) {
      console.error("Error saving blog:", error)
      toast.error("Failed to save blog post")
    } finally {
      setFormLoading(false)
    }
  }

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      detailedDescription: blog.detailedDescription || "",
      category: blog.category,
      tags: blog.tags,
      readTime: blog.readTime,
      author: blog.author,
      thumbnail: blog.thumbnail || "",
      contentImage1: blog.contentImage1 || "",
      contentImage2: blog.contentImage2 || "",
      featured: blog.featured,
      published: blog.published,
    })
    setEditingBlog(blog)
    setShowForm(true)
  }

  const handleDelete = async (blogId) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedBlogs = blogs.filter((blog) => blog.id !== blogId)
      setBlogs(updatedBlogs)
      setConfirmModal({ isOpen: false, blogId: null, blogTitle: "" })
      toast.success("Blog post deleted successfully!")
    } catch (error) {
      console.error("Error deleting blog:", error)
      toast.error("Failed to delete blog post")
    }
  }

  const addTag = (tag) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] })
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">Loading Blog Management...</h1>
          <p className="text-gray-400">Verifying admin access</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <InteractiveBackground />
      <Navbar />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, blogId: null, blogTitle: "" })}
        onConfirm={() => handleDelete(confirmModal.blogId)}
        title="Delete Blog Post"
        message={`Are you sure you want to delete "${confirmModal.blogTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-3 text-sm">
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <span className="text-gray-600">→</span>
              <Link
                href="/admin/dashboard"
                className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </Link>
              <span className="text-gray-600">→</span>
              <span className="text-blue-400 font-medium flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Blog Management</span>
              </span>
            </div>
          </nav>

          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100">
                    BLOG MANAGER
                  </h1>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">Content Management System</span>
                  </div>
                </div>
              </div>
              <p className="text-xl text-gray-400 mb-4">Create, edit, and manage your blog content</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>{blogs.length} Posts</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>{blogs.reduce((sum, blog) => sum + (blog.views || 0), 0)} Views</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                resetForm()
                setShowForm(true)
              }}
              className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg border border-blue-500/30"
            >
              <Plus className="w-5 h-5" />
              <span>New Blog Post</span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                label: "Total Posts",
                value: blogs.length,
                icon: FileText,
                color: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-500/10",
                borderColor: "border-blue-500/30",
              },
              {
                label: "Published",
                value: blogs.filter((blog) => blog.published).length,
                icon: Globe,
                color: "from-green-500 to-green-600",
                bgColor: "bg-green-500/10",
                borderColor: "border-green-500/30",
              },
              {
                label: "Total Views",
                value: blogs.reduce((sum, blog) => sum + (blog.views || 0), 0),
                icon: Eye,
                color: "from-purple-500 to-purple-600",
                bgColor: "bg-purple-500/10",
                borderColor: "border-purple-500/30",
              },
              {
                label: "Featured",
                value: blogs.filter((blog) => blog.featured).length,
                icon: Star,
                color: "from-orange-500 to-orange-600",
                bgColor: "bg-orange-500/10",
                borderColor: "border-orange-500/30",
              },
            ].map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div
                  key={index}
                  className={`relative group ${stat.bgColor} backdrop-blur-xl border ${stat.borderColor} rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400 opacity-60" />
                    </div>
                    <div className="text-3xl font-black text-white mb-2">{stat.value.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Search and Filter */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700/50 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                />
              </div>
              <div className="flex items-center space-x-3">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Blog Form */}
          {showForm && (
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 mb-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
                    </h2>
                    <p className="text-gray-400 text-sm">Fill in the details below</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-lg flex items-center justify-center transition-colors duration-300"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Basic Information</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Title <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        placeholder="Enter blog post title"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Category <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        required
                      >
                        <option value="">Select category</option>
                        {categories.slice(1).map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Read Time</label>
                      <input
                        type="text"
                        value={formData.readTime}
                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        placeholder="e.g., 5 min read"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Excerpt <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        rows={3}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300 resize-none"
                        placeholder="Brief description for blog cards and previews"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Detailed Description</label>
                      <textarea
                        value={formData.detailedDescription}
                        onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
                        rows={4}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300 resize-none"
                        placeholder="Detailed description for SEO and blog detail pages"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Content</h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Blog Content <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={12}
                      className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300 resize-none font-mono text-sm"
                      placeholder="Write your blog content here... (Supports Markdown)"
                      required
                    />
                    <p className="text-gray-500 text-xs mt-2">Supports Markdown formatting</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Tag className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Tags</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-lg"
                        >
                          <span>#{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-blue-300 hover:text-white transition-colors duration-300"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        placeholder="Add a tag"
                        className="flex-1 bg-gray-800/50 border border-gray-700/50 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addTag(e.target.value.trim())
                            e.target.value = ""
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          const input = e.target.previousElementSibling
                          addTag(input.value.trim())
                          input.value = ""
                        }}
                        className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-xl hover:bg-blue-500/30 transition-all duration-300"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Image Uploads */}
                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Images</h3>
                  </div>

                  <div className="space-y-6">
                    {/* Thumbnail */}
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Blog Thumbnail</label>
                      <div className="border-2 border-dashed border-gray-700/50 rounded-xl p-6 text-center hover:border-gray-600/50 transition-colors duration-300">
                        {formData.thumbnail ? (
                          <div className="space-y-4">
                            <img
                              src={formData.thumbnail || "/placeholder.svg"}
                              alt="Thumbnail preview"
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, thumbnail: "" }))}
                              className="text-red-400 hover:text-red-300 transition-colors duration-300"
                            >
                              Remove Image
                            </button>
                          </div>
                        ) : (
                          <div>
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-400 mb-4">Upload blog thumbnail</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e.target.files[0], "thumbnail")}
                              className="hidden"
                              id="thumbnail-upload"
                            />
                            <label
                              htmlFor="thumbnail-upload"
                              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors duration-300"
                            >
                              Choose File
                            </label>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content Images */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Content Image 1 */}
                      <div>
                        <label className="block text-gray-300 font-medium mb-2">Content Image 1</label>
                        <div className="border-2 border-dashed border-gray-700/50 rounded-xl p-4 text-center hover:border-gray-600/50 transition-colors duration-300">
                          {formData.contentImage1 ? (
                            <div className="space-y-3">
                              <img
                                src={formData.contentImage1 || "/placeholder.svg"}
                                alt="Content image 1 preview"
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => setFormData((prev) => ({ ...prev, contentImage1: "" }))}
                                className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          ) : (
                            <div>
                              <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-400 text-sm mb-3">Content image</p>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e.target.files[0], "contentImage1")}
                                className="hidden"
                                id="content-image-1-upload"
                              />
                              <label
                                htmlFor="content-image-1-upload"
                                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg cursor-pointer transition-colors duration-300 text-sm"
                              >
                                Upload
                              </label>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content Image 2 */}
                      <div>
                        <label className="block text-gray-300 font-medium mb-2">Content Image 2</label>
                        <div className="border-2 border-dashed border-gray-700/50 rounded-xl p-4 text-center hover:border-gray-600/50 transition-colors duration-300">
                          {formData.contentImage2 ? (
                            <div className="space-y-3">
                              <img
                                src={formData.contentImage2 || "/placeholder.svg"}
                                alt="Content image 2 preview"
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => setFormData((prev) => ({ ...prev, contentImage2: "" }))}
                                className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          ) : (
                            <div>
                              <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-400 text-sm mb-3">Content image</p>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e.target.files[0], "contentImage2")}
                                className="hidden"
                                id="content-image-2-upload"
                              />
                              <label
                                htmlFor="content-image-2-upload"
                                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg cursor-pointer transition-colors duration-300 text-sm"
                              >
                                Upload
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Settings */}
                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Settings</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl">
                      <div>
                        <h4 className="text-white font-medium">Featured Post</h4>
                        <p className="text-gray-400 text-sm">Show in featured section</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl">
                      <div>
                        <h4 className="text-white font-medium">Published</h4>
                        <p className="text-gray-400 text-sm">Make post publicly visible</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.published}
                          onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700/50">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 text-gray-300 hover:text-white rounded-xl font-medium transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                  >
                    {formLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>{editingBlog ? "Update Post" : "Create Post"}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="group bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-600/50 transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-700 overflow-hidden">
                  {blog.thumbnail ? (
                    <img
                      src={blog.thumbnail || "/placeholder.svg"}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-gray-600" />
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center space-x-2">
                    {blog.featured && (
                      <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full">
                        FEATURED
                      </span>
                    )}
                    <span className="px-2 py-1 bg-black/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      {blog.category}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="w-8 h-8 bg-blue-500/80 hover:bg-blue-500 backdrop-blur-sm text-white rounded-lg flex items-center justify-center transition-colors duration-300"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setConfirmModal({ isOpen: true, blogId: blog.id, blogTitle: blog.title })}
                      className="w-8 h-8 bg-red-500/80 hover:bg-red-500 backdrop-blur-sm text-white rounded-lg flex items-center justify-center transition-colors duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3 text-sm text-gray-400">
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                    <span>{blog.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
                    {blog.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {blog.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 text-gray-300 text-xs rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                    {blog.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 text-gray-300 text-xs rounded">
                        +{blog.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{blog.views || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{blog.likes || 0}</span>
                      </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${blog.published ? "bg-green-500" : "bg-gray-500"}`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredBlogs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No blog posts found</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                {searchQuery || selectedCategory !== "all"
                  ? "Try adjusting your search terms or filters."
                  : "Get started by creating your first blog post."}
              </p>
              <button
                onClick={() => {
                  if (searchQuery || selectedCategory !== "all") {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  } else {
                    resetForm()
                    setShowForm(true)
                  }
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
              >
                {searchQuery || selectedCategory !== "all" ? "Clear Filters" : "Create First Post"}
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AdminBlogPage

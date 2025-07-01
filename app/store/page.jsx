"use client"

import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabaseClient"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import InteractiveBackground from "../../components/interactive-background"
import ProductCard from "../../components/product-card"
import Link from "next/link"
import { Search, Grid3X3, List, Package, Code, Palette, Database } from "lucide-react"

const StorePage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("newest")

  // Load products from database
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("is_published", true)
          .order("created_at", { ascending: false })

        if (error) throw error
        setProducts(data || [])
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const title = product.title || ""
      const description = product.description || ""
      const category = product.category || ""

      const matchesSearch =
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.price || 0) - (b.price || 0)
        case "price-high":
          return (b.price || 0) - (a.price || 0)
        case "popular":
          return b.is_popular - a.is_popular
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        default:
          return new Date(b.created_at) - new Date(a.created_at)
      }
    })

  const categories = [
    { id: "all", name: "All Products", icon: Package },
    { id: "template", name: "Templates", icon: Code },
    { id: "ui-kit", name: "UI Kits", icon: Palette },
    { id: "tools", name: "Tools", icon: Database },
  ]

  const sortOptions = [
    { id: "newest", name: "Newest First" },
    { id: "popular", name: "Most Popular" },
    { id: "rating", name: "Highest Rated" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">Loading Store...</h1>
          <p className="text-gray-400">Please wait</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <InteractiveBackground />
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-3 text-sm">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                Home
              </Link>
              <span className="text-gray-600">→</span>
              <span className="text-blue-400 font-medium">Store</span>
            </div>
          </nav>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100">
              DIGITAL STORE
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Premium templates, UI kits, and development tools to accelerate your projects
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700/50 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                      selectedCategory === category.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-900/50 border border-gray-700/50 text-gray-300 hover:border-gray-600/50"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Sort and View Options */}
            <div className="flex items-center space-x-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-900/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>

              <div className="flex border border-gray-700/50 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 transition-colors duration-300 ${
                    viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-900/50 text-gray-400 hover:text-white"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 transition-colors duration-300 ${
                    viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-900/50 text-gray-400 hover:text-white"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-400">
              Showing {filteredProducts.length} of {products.length} products
              {selectedCategory !== "all" && (
                <span className="text-blue-400 ml-1">in {categories.find((c) => c.id === selectedCategory)?.name}</span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          {filteredProducts.length > 0 ? (
            <div
              className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col space-y-6"}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-900/50 border border-gray-700/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No products found</h3>
              <p className="text-gray-400 mb-8">
                {searchQuery || selectedCategory !== "all"
                  ? "Try adjusting your search or filters"
                  : "No products available at the moment"}
              </p>
              {(searchQuery || selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-300"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default StorePage

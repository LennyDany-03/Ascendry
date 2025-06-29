"use client"

import { useState } from "react"
import Navbar from "../../components/navbar.jsx"
import Footer from "../../components/footer.jsx"
import InteractiveBackground from "../../components/interactive-background"
import Link from "next/link"
import {
  ShoppingBag,
  Code,
  Filter,
  Search,
  ArrowRight,
  Star,
  Users,
  Download,
  CreditCard,
  Layers,
  Globe,
  Palette,
  Database,
  CheckCircle,
  Heart,
  Gift,
  Package,
  Rocket,
  MessageSquare,
  Briefcase,
} from "lucide-react"

const StorePage = () => {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const products = [
    {
      id: "novapay-template",
      title: "NovaPay - UPI Expense Tracker",
      description:
        "Complete React template for UPI expense tracking with dashboard, analytics, and backend integration. Includes source code, documentation, and deployment guide.",
      techStack: ["React", "Supabase", "Tailwind CSS", "Chart.js", "Vite"],
      price: 799,
      originalPrice: 999,
      category: "template",
      isPopular: true,
      thumbnail: "/placeholder.svg?height=200&width=300",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      icon: CreditCard,
      features: ["AI Insights", "Real-time Tracking", "Smart Analytics", "Export Data"],
      downloads: "500+",
      rating: 4.9,
      complexity: "Advanced",
    },
    {
      id: "clubsphere-admin",
      title: "ClubSphere Admin Panel",
      description:
        "Full-featured admin dashboard for college club management with event handling, member management, and analytics. Perfect for educational institutions.",
      techStack: ["React", "Firebase", "Material-UI", "Node.js"],
      price: 499,
      category: "template",
      thumbnail: "/placeholder.svg?height=200&width=300",
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      icon: Users,
      features: ["Event Management", "Member Portal", "Analytics", "Payment Integration"],
      downloads: "300+",
      rating: 4.8,
      complexity: "Intermediate",
    },
    {
      id: "hospital-chatbot",
      title: "Hospital ChatBot Template",
      description:
        "AI-powered healthcare chatbot supporting Tamil and English. Includes NLP processing, appointment booking, and medical consultation features.",
      techStack: ["Python", "TensorFlow", "Flask", "React", "MongoDB"],
      price: 699,
      category: "template",
      thumbnail: "/placeholder.svg?height=200&width=300",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      icon: MessageSquare,
      features: ["Multilingual Support", "AI Processing", "Appointment System", "Medical Database"],
      downloads: "200+",
      rating: 4.7,
      complexity: "Advanced",
    },
    {
      id: "tailwind-ui-kit",
      title: "Tailwind UI Component Kit",
      description:
        "50+ premium UI components built with Tailwind CSS. Cards, buttons, forms, navigation, and more. Copy-paste ready code snippets.",
      techStack: ["Tailwind CSS", "React", "TypeScript", "Storybook"],
      price: 199,
      category: "ui-kit",
      thumbnail: "/placeholder.svg?height=200&width=300",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      icon: Palette,
      features: ["50+ Components", "TypeScript Support", "Dark Mode", "Responsive Design"],
      downloads: "800+",
      rating: 4.9,
      complexity: "Beginner",
    },
    {
      id: "dark-portfolio-template",
      title: "Dark Theme Portfolio Template",
      description:
        "Modern dark theme portfolio template with animations, interactive background, and responsive design. Perfect for developers and designers.",
      techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
      price: 299,
      category: "template",
      thumbnail: "/placeholder.svg?height=200&width=300",
      gradient: "from-gray-500 via-gray-600 to-gray-700",
      icon: Globe,
      features: ["Interactive Animations", "Dark Theme", "SEO Optimized", "Mobile First"],
      downloads: "600+",
      rating: 4.8,
      complexity: "Intermediate",
    },
    {
      id: "church-ministry-template",
      title: "Church Ministry Website Template",
      description:
        "Complete church website template with event management, donation integration, media gallery, and member portal. Fully customizable.",
      techStack: ["Next.js", "Stripe", "Sanity CMS", "Tailwind CSS"],
      price: 0,
      isFree: true,
      category: "template",
      thumbnail: "/placeholder.svg?height=200&width=300",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      icon: Heart,
      features: ["Event Management", "Donation System", "Media Gallery", "Member Portal"],
      downloads: "1.2k+",
      rating: 4.9,
      complexity: "Intermediate",
    },
  ]

  const categories = [
    { id: "all", name: "All Products", count: products.length, icon: Package, color: "from-gray-500 to-gray-600" },
    { id: "template", name: "Templates", count: 5, icon: Code, color: "from-blue-500 to-purple-500" },
    { id: "ui-kit", name: "UI Kits", count: 1, icon: Palette, color: "from-green-500 to-emerald-500" },
    { id: "tools", name: "Tools", count: 0, icon: Database, color: "from-orange-500 to-red-500" },
  ]

  const filters = [
    { id: "all", name: "All", icon: Layers, color: "from-gray-500 to-gray-600" },
    { id: "free", name: "Free", icon: Gift, color: "from-green-500 to-emerald-500" },
    { id: "paid", name: "Paid", icon: CreditCard, color: "from-blue-500 to-purple-500" },
  ]

  const stats = [
    {
      title: "Total Products",
      value: "25+",
      icon: Package,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      description: "Digital products available",
    },
    {
      title: "Happy Customers",
      value: "500+",
      icon: Users,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      description: "Satisfied buyers worldwide",
    },
    {
      title: "Total Downloads",
      value: "5k+",
      icon: Download,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      description: "Products downloaded",
    },
    {
      title: "Average Rating",
      value: "4.8★",
      icon: Star,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
      description: "Customer satisfaction",
    },
  ]

  const complexityColors = {
    Beginner: "text-green-400 bg-green-500/10 border-green-500/30",
    Intermediate: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
    Advanced: "text-red-400 bg-red-500/10 border-red-500/30",
  }

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory
    const filterMatch =
      selectedFilter === "all" ||
      (selectedFilter === "free" && product.isFree) ||
      (selectedFilter === "paid" && !product.isFree)

    return categoryMatch && filterMatch
  })

  return (
    <div className="min-h-screen bg-black text-white relative">
      <InteractiveBackground />
      <Navbar />
      <br />
      {/* Enhanced Hero Section */}
      <section className="pt-24 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Content */}
          <div className="text-center mb-12">
            {/* Animated Badge */}
            <div className="mb-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-2xl">
                <div className="relative">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping opacity-20"></div>
                </div>
                <ShoppingBag className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 font-medium text-sm">Digital Marketplace</span>
                <div className="w-px h-4 bg-gray-600"></div>
                <span className="text-blue-400 font-bold text-xs">Premium Collection</span>
              </div>
            </div>
            <br />
            {/* Main Title with Animation */}
            <div className="mb-6">
              <h1 className="font-black leading-none">
                <div className="relative mb-4">
                  <span className="text-3xl md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100 drop-shadow-2xl">
                    ASCENDRY STORE
                  </span>
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-2xl opacity-60 animate-pulse"></div>
                </div>
                <div className="text-base md:text-lg text-gray-400 font-medium">
                  Premium Digital{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Solutions
                  </span>
                </div>
              </h1>
            </div>

            {/* Enhanced Description */}
            <p className="text-base md:text-lg text-gray-400 mb-8 max-w-4xl mx-auto leading-relaxed">
              Discover premium templates, UI kits, and digital tools crafted with modern technologies. Each product
              includes source code, documentation, and lifetime updates.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="group relative bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-xl overflow-hidden">
                <span className="relative z-10 flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filter Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>

              <button className="group border-2 border-white hover:bg-white hover:text-black text-white px-6 py-3 font-bold text-sm transition-all duration-300 hover:scale-105 rounded-xl flex items-center space-x-2">
                <Search className="w-4 h-4" />
                <span>Search Store</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div
                  key={index}
                  className={`group relative ${stat.bgColor} backdrop-blur-xl border ${stat.borderColor} rounded-2xl p-4 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden`}
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10 text-center">
                    <div className="w-10 h-10 bg-gray-900/50 border border-gray-700/50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div className="text-lg font-black text-white mb-1">{stat.value}</div>
                    <div className="text-xs font-bold text-white mb-1">{stat.title}</div>
                    <div className="text-gray-400 text-xs">{stat.description}</div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Filters Section */}
      <section className="py-12 bg-gradient-to-b from-gray-950/30 to-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 px-3 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-4">
              <Filter className="w-3 h-3 text-blue-400" />
              <span className="text-blue-400 font-medium text-xs">Browse & Filter</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100">
              FIND YOUR PERFECT SOLUTION
            </h2>
            <p className="text-sm text-gray-400">Explore products by category and pricing</p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Categories */}
            <div className="flex flex-col items-center">
              <span className="text-gray-400 font-medium mb-3 text-xs">Categories:</span>
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`group relative backdrop-blur-xl border rounded-xl px-3 py-2 transition-all duration-300 hover:scale-105 overflow-hidden ${
                        selectedCategory === category.id
                          ? "bg-blue-500/20 border-blue-500/50 text-white"
                          : "bg-gray-900/50 border-gray-700/50 text-gray-300 hover:border-gray-600/50"
                      }`}
                    >
                      {/* Background Gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      ></div>

                      <div className="relative z-10 flex items-center space-x-2">
                        <div
                          className={`w-6 h-6 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent className="w-3 h-3 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-xs">{category.name}</div>
                          <div className="text-gray-400 text-xs">{category.count} items</div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Price Filters */}
            <div className="flex flex-col items-center">
              <span className="text-gray-400 font-medium mb-3 text-xs">Price Filter:</span>
              <div className="flex flex-wrap gap-3 justify-center">
                {filters.map((filter) => {
                  const IconComponent = filter.icon
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`group relative backdrop-blur-xl border rounded-xl px-3 py-2 transition-all duration-300 hover:scale-105 overflow-hidden ${
                        selectedFilter === filter.id
                          ? "bg-purple-500/20 border-purple-500/50 text-white"
                          : "bg-gray-900/50 border-gray-700/50 text-gray-300 hover:border-gray-600/50"
                      }`}
                    >
                      {/* Background Gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${filter.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      ></div>

                      <div className="relative z-10 flex items-center space-x-2">
                        <div
                          className={`w-6 h-6 bg-gradient-to-r ${filter.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-bold text-xs">{filter.name}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Products Grid */}
      <section className="py-12 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-3 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-4">
              <Package className="w-3 h-3 text-purple-400" />
              <span className="text-purple-400 font-medium text-xs">Premium Products</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-pink-100">
              DIGITAL MARKETPLACE
            </h2>
            <p className="text-sm text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Each product is carefully crafted with modern technologies and includes comprehensive documentation
            </p>
          </div>

          {/* Enhanced Product Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const IconComponent = product.icon
              return (
                <div
                  key={product.id}
                  className="group relative bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-xl border border-gray-700/30 hover:border-purple-500/50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Popular Badge */}
                  {product.isPopular && (
                    <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>POPULAR</span>
                      </div>
                    </div>
                  )}

                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  {/* Product Image */}
                  <div className="relative h-40 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-20 group-hover:opacity-30 transition-all duration-500`}
                    ></div>
                    <div className="absolute inset-0 bg-black/20"></div>

                    {/* Product Icon */}
                    <div className="absolute top-4 left-4">
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${product.gradient} rounded-xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Complexity Badge */}
                    <div className="absolute top-4 left-16">
                      <div
                        className={`px-2 py-1 rounded-lg backdrop-blur-sm border text-xs font-medium ${complexityColors[product.complexity]}`}
                      >
                        {product.complexity}
                      </div>
                    </div>

                    {/* Price Overlay */}
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-black/80 backdrop-blur-sm px-2 py-1 rounded-xl border border-gray-700">
                        {product.isFree ? (
                          <span className="text-green-400 font-bold text-sm flex items-center space-x-1">
                            <Gift className="w-3 h-3" />
                            <span>FREE</span>
                          </span>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-bold text-sm">₹{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-gray-400 line-through text-xs">₹{product.originalPrice}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Rating & Downloads */}
                    <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                      <div className="bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-gray-700">
                        <div className="flex items-center space-x-1 text-yellow-400">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-xs font-medium text-white">{product.rating}</span>
                        </div>
                      </div>
                      <div className="bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-gray-700">
                        <div className="flex items-center space-x-1 text-blue-400">
                          <Download className="w-3 h-3" />
                          <span className="text-xs font-medium text-white">{product.downloads}</span>
                        </div>
                      </div>
                    </div>

                    {/* Placeholder Image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl opacity-40 group-hover:opacity-60 transition-opacity duration-300">
                        🛍️
                      </div>
                    </div>
                  </div>

                  {/* Product Content */}
                  <div className="p-4 relative z-10">
                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                      {product.title}
                    </h3>

                    <p className="text-gray-400 mb-3 group-hover:text-gray-200 transition-colors duration-300 line-clamp-3 leading-relaxed text-sm">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="mb-3">
                      <div className="text-gray-300 font-semibold mb-2 flex items-center space-x-2 text-xs">
                        <CheckCircle className="w-3 h-3" />
                        <span>Key Features</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {product.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                            <span className="text-gray-400 text-xs group-hover:text-gray-200 transition-colors duration-300">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <div className="text-gray-300 font-semibold mb-2 flex items-center space-x-2 text-xs">
                        <Code className="w-3 h-3" />
                        <span>Technologies</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {product.techStack.slice(0, 4).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 text-gray-300 text-xs rounded-lg group-hover:border-gray-600/50 group-hover:text-white transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {product.techStack.length > 4 && (
                          <span className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 text-gray-300 text-xs rounded-lg">
                            +{product.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/store/${product.id}`}
                        className="flex-1 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 text-white px-3 py-2 rounded-xl font-medium text-xs transition-all duration-300 hover:scale-105 text-center"
                      >
                        View Details
                      </Link>

                      <Link
                        href={`#buy-${product.id}`}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-3 py-2 rounded-xl font-medium text-xs transition-all duration-300 hover:scale-105 text-center shadow-lg"
                      >
                        {product.isFree ? "Download" : "Buy Now"}
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div
                    className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${product.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                  ></div>
                </div>
              )
            })}
          </div>

          {/* No Products Found */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-900/50 border border-gray-700/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-4">No products found</h3>
              <p className="text-gray-400 mb-6 text-sm max-w-md mx-auto">
                Try adjusting your filters or check back later for new products.
              </p>
              <button
                onClick={() => {
                  setSelectedFilter("all")
                  setSelectedCategory("all")
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg text-sm"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-12 bg-gradient-to-b from-gray-950/50 to-black relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 lg:p-8 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            {/* Floating Elements */}
            <div className="absolute top-6 right-6 w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-30 animate-bounce"></div>

            <div className="relative z-10">
              <div className="mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl lg:text-2xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100">
                  Need Something Custom?
                </h2>
                <p className="text-gray-400 mb-6 max-w-2xl mx-auto text-sm leading-relaxed">
                  Don't see what you're looking for? Let's build it together! I create custom solutions tailored to your
                  specific needs with modern technologies and best practices.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/hire"
                  className="group relative bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Hire Me</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Link>

                <Link
                  href="/services"
                  className="group border-2 border-white hover:bg-white hover:text-black text-white px-6 py-3 font-bold text-sm transition-all duration-300 hover:scale-105 rounded-xl flex items-center space-x-2"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>View Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* Additional Info */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-lg font-black text-blue-400">Free</div>
                  <div className="text-gray-400 text-xs">Consultation</div>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-black text-purple-400">Lifetime</div>
                  <div className="text-gray-400 text-xs">Updates</div>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-black text-pink-400">24/7</div>
                  <div className="text-gray-400 text-xs">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default StorePage

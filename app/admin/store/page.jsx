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
  Edit,
  Trash2,
  Search,
  Package,
  Code,
  Globe,
  Smartphone,
  Database,
  Palette,
  ShoppingCart,
  Brain,
  Target,
  Star,
  ArrowLeft,
  Save,
  X,
  Upload,
  ImageIcon,
  FileText,
  Gift,
  CreditCard,
  Download,
  Users,
  MessageSquare,
  Briefcase,
  Heart,
} from "lucide-react"

const AdminStorePage = () => {
  const [user, setUser] = useState(null)
  const [adminData, setAdminData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: [],
    price: "",
    originalPrice: "",
    category: "template",
    isPopular: false,
    isFree: false,
    thumbnail: "",
    gradient: "from-blue-500 to-purple-500",
    icon: "Code",
    features: [],
    downloads: "0+",
    rating: "4.5",
    complexity: "Intermediate",
  })
  const [techInput, setTechInput] = useState("")
  const [featureInput, setFeatureInput] = useState("")
  const [uploading, setUploading] = useState(false)
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, productId: null, productTitle: "" })
  const router = useRouter()
  const toast = useToast()

  // Check authentication
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

        // Check admin access
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
        await loadProducts()
      } catch (error) {
        console.error("Auth check error:", error)
        router.push("/admin/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  // Load products from database (mock data for now)
  const loadProducts = async () => {
    // Mock data - replace with actual Supabase query
    const mockProducts = [
      {
        id: "novapay-template",
        title: "NovaPay - UPI Expense Tracker",
        description:
          "Complete React template for UPI expense tracking with dashboard, analytics, and backend integration.",
        techStack: ["React", "Supabase", "Tailwind CSS", "Chart.js", "Vite"],
        price: 799,
        originalPrice: 999,
        category: "template",
        isPopular: true,
        isFree: false,
        thumbnail: "/placeholder.svg?height=200&width=300",
        gradient: "from-purple-500 via-pink-500 to-rose-500",
        icon: "CreditCard",
        features: ["AI Insights", "Real-time Tracking", "Smart Analytics", "Export Data"],
        downloads: "500+",
        rating: 4.9,
        complexity: "Advanced",
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z",
      },
      {
        id: "tailwind-ui-kit",
        title: "Tailwind UI Component Kit",
        description: "50+ premium UI components built with Tailwind CSS. Cards, buttons, forms, navigation, and more.",
        techStack: ["Tailwind CSS", "React", "TypeScript", "Storybook"],
        price: 199,
        originalPrice: null,
        category: "ui-kit",
        isPopular: false,
        isFree: false,
        thumbnail: "/placeholder.svg?height=200&width=300",
        gradient: "from-green-500 via-emerald-500 to-teal-500",
        icon: "Palette",
        features: ["50+ Components", "TypeScript Support", "Dark Mode", "Responsive Design"],
        downloads: "800+",
        rating: 4.9,
        complexity: "Beginner",
        created_at: "2024-01-10T10:00:00Z",
        updated_at: "2024-01-10T10:00:00Z",
      },
    ]
    setProducts(mockProducts)
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  // Handle tech stack
  const addTech = () => {
    if (techInput.trim() && !formData.techStack.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, techInput.trim()],
      }))
      setTechInput("")
    }
  }

  const removeTech = (tech) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tech),
    }))
  }

  // Handle features
  const addFeature = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }))
      setFeatureInput("")
    }
  }

  const removeFeature = (feature) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }))
  }

  // Handle image upload
  const handleImageUpload = async (file, fieldName) => {
    if (!file) return

    setUploading(true)
    try {
      // Mock upload - replace with actual Supabase storage upload
      const mockUrl = URL.createObjectURL(file)
      setFormData((prev) => ({ ...prev, [fieldName]: mockUrl }))

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Image uploaded successfully!")
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)

    try {
      // Validate required fields
      if (!formData.title || !formData.description) {
        toast.error("Please fill in all required fields")
        setUploading(false)
        return
      }

      // Mock save - replace with actual Supabase insert/update
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const cleanedData = {
        ...formData,
        price: formData.isFree ? 0 : Number.parseInt(formData.price) || 0,
        originalPrice: formData.originalPrice ? Number.parseInt(formData.originalPrice) : null,
        rating: Number.parseFloat(formData.rating) || 4.5,
      }

      if (editingProduct) {
        // Update existing product
        setProducts((prev) =>
          prev.map((p) =>
            p.id === editingProduct.id
              ? { ...cleanedData, id: editingProduct.id, updated_at: new Date().toISOString() }
              : p,
          ),
        )
        toast.success("Product updated successfully!")
      } else {
        // Create new product
        const newProduct = {
          ...cleanedData,
          id: `product-${Date.now()}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        setProducts((prev) => [newProduct, ...prev])
        toast.success("Product created successfully!")
      }

      // Reset form
      setTimeout(() => {
        setShowForm(false)
        setEditingProduct(null)
        resetForm()
      }, 1000)
    } catch (error) {
      console.error("Save error:", error)
      toast.error("Error saving product. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      techStack: [],
      price: "",
      originalPrice: "",
      category: "template",
      isPopular: false,
      isFree: false,
      thumbnail: "",
      gradient: "from-blue-500 to-purple-500",
      icon: "Code",
      features: [],
      downloads: "0+",
      rating: "4.5",
      complexity: "Intermediate",
    })
    setTechInput("")
    setFeatureInput("")
  }

  // Handle edit
  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData(product)
    setShowForm(true)
  }

  // Handle delete confirmation
  const handleDeleteClick = (product) => {
    setConfirmModal({
      isOpen: true,
      productId: product.id,
      productTitle: product.title,
    })
  }

  // Handle delete
  const handleDelete = async () => {
    try {
      setProducts((prev) => prev.filter((p) => p.id !== confirmModal.productId))
      toast.success("Product deleted successfully!")
    } catch (error) {
      toast.error("Failed to delete product")
    }
  }

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [
    { id: "all", name: "All Products", icon: Package },
    { id: "template", name: "Templates", icon: Code },
    { id: "ui-kit", name: "UI Kits", icon: Palette },
    { id: "tools", name: "Tools", icon: Database },
  ]

  const iconOptions = [
    "Code",
    "Globe",
    "Smartphone",
    "Database",
    "Palette",
    "ShoppingCart",
    "Brain",
    "Target",
    "Users",
    "CreditCard",
    "Heart",
    "Zap",
  ]

  const gradientOptions = [
    "from-blue-500 to-purple-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-blue-500",
    "from-orange-500 to-red-500",
    "from-cyan-500 to-blue-500",
    "from-yellow-500 to-orange-500",
    "from-pink-500 to-rose-500",
    "from-indigo-500 to-purple-500",
  ]

  const getIconComponent = (iconName) => {
    const icons = {
      Code,
      Globe,
      Smartphone,
      Database,
      Palette,
      ShoppingCart,
      Brain,
      Target,
      Users,
      CreditCard,
      Heart,
      MessageSquare,
      Briefcase,
    }
    return icons[iconName] || Code
  }

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
              <Link href="/admin/dashboard" className="text-gray-400 hover:text-white transition-colors duration-300">
                Admin
              </Link>
              <span className="text-gray-600">→</span>
              <span className="text-blue-400 font-medium">Store</span>
            </div>
          </nav>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100">
                MANAGE STORE
              </h1>
              <p className="text-xl text-gray-400">Create and manage your digital products</p>
            </div>

            <button
              onClick={() => {
                resetForm()
                setShowForm(true)
                setEditingProduct(null)
              }}
              className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
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
          </div>
        </div>
      </section>

      {/* Products Grid */}
      {!showForm && (
        <section className="py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            {filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const IconComponent = getIconComponent(product.icon)
                  return (
                    <div
                      key={product.id}
                      className="group bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-600/50 transition-all duration-300"
                    >
                      {/* Product Image */}
                      <div className="relative h-48 overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-20`}></div>
                        {product.thumbnail ? (
                          <img
                            src={product.thumbnail || "/placeholder.svg"}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl opacity-40">📦</div>
                          </div>
                        )}

                        {/* Popular Badge */}
                        {product.isPopular && (
                          <div className="absolute top-4 left-4">
                            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
                              <Star className="w-3 h-3" />
                              <span>POPULAR</span>
                            </div>
                          </div>
                        )}

                        {/* Price */}
                        <div className="absolute bottom-4 left-4">
                          <div className="bg-black/80 backdrop-blur-sm px-3 py-2 rounded-xl border border-gray-700">
                            {product.isFree ? (
                              <span className="text-green-400 font-bold text-lg flex items-center space-x-1">
                                <Gift className="w-4 h-4" />
                                <span>FREE</span>
                              </span>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <span className="text-white font-bold text-lg">₹{product.price}</span>
                                {product.originalPrice && (
                                  <span className="text-gray-400 line-through text-sm">₹{product.originalPrice}</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => handleEdit(product)}
                            className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors duration-300"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(product)}
                            className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center transition-colors duration-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Product Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-blue-400 text-xs font-medium uppercase tracking-wider">
                            {product.category}
                          </span>
                          <div className="flex items-center space-x-1 text-yellow-400">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-xs">{product.rating}</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {product.techStack.slice(0, 3).map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 text-gray-300 text-xs rounded"
                            >
                              {tech}
                            </span>
                          ))}
                          {product.techStack.length > 3 && (
                            <span className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 text-gray-300 text-xs rounded">
                              +{product.techStack.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1 text-blue-400">
                            <Download className="w-3 h-3" />
                            <span>{product.downloads}</span>
                          </div>
                          <div className="text-gray-400">{product.complexity}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
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
                    : "Create your first product to get started"}
                </p>
                <button
                  onClick={() => {
                    resetForm()
                    setShowForm(true)
                    setEditingProduct(null)
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                >
                  Create First Product
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Product Form */}
      {showForm && (
        <section className="py-12 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
              {/* Form Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {editingProduct ? "Edit Product" : "Create New Product"}
                  </h2>
                  <p className="text-gray-400">
                    {editingProduct ? "Update product details" : "Add a new product to your store"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setEditingProduct(null)
                    resetForm()
                  }}
                  className="w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-lg flex items-center justify-center transition-colors duration-300"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <span>Basic Information</span>
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">
                        Product Title <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        placeholder="Enter product title"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                      >
                        <option value="template">Template</option>
                        <option value="ui-kit">UI Kit</option>
                        <option value="tools">Tools</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300 resize-none"
                      placeholder="Enter product description"
                    />
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-blue-400" />
                    <span>Pricing & Settings</span>
                  </h3>

                  <div className="flex items-center space-x-6 mb-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isFree"
                        checked={formData.isFree}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-300">Free Product</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isPopular"
                        checked={formData.isPopular}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-300">Mark as Popular</span>
                    </label>
                  </div>

                  {!formData.isFree && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-300 font-medium mb-2">Price (₹)</label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                          placeholder="0"
                          min="0"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 font-medium mb-2">Original Price (₹)</label>
                        <input
                          type="number"
                          name="originalPrice"
                          value={formData.originalPrice}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                          placeholder="Optional"
                          min="0"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Tech Stack */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <Code className="w-5 h-5 text-blue-400" />
                    <span>Technology Stack</span>
                  </h3>

                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Add Technologies</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                        className="flex-1 bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        placeholder="Enter technology name"
                      />
                      <button
                        type="button"
                        onClick={addTech}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-300"
                      >
                        Add
                      </button>
                    </div>

                    {formData.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {formData.techStack.map((tech, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-lg"
                          >
                            <span>{tech}</span>
                            <button
                              type="button"
                              onClick={() => removeTech(tech)}
                              className="text-blue-300 hover:text-white transition-colors duration-300"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <Star className="w-5 h-5 text-blue-400" />
                    <span>Key Features</span>
                  </h3>

                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Add Features</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                        className="flex-1 bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        placeholder="Enter feature name"
                      />
                      <button
                        type="button"
                        onClick={addFeature}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-300"
                      >
                        Add
                      </button>
                    </div>

                    {formData.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {formData.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 bg-green-500/20 border border-green-500/30 text-green-300 px-3 py-1 rounded-lg"
                          >
                            <span>{feature}</span>
                            <button
                              type="button"
                              onClick={() => removeFeature(feature)}
                              className="text-green-300 hover:text-white transition-colors duration-300"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-400" />
                    <span>Product Details</span>
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Complexity</label>
                      <select
                        name="complexity"
                        value={formData.complexity}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Downloads</label>
                      <input
                        type="text"
                        name="downloads"
                        value={formData.downloads}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        placeholder="e.g., 500+"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Rating</label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Visual Settings */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <Palette className="w-5 h-5 text-blue-400" />
                    <span>Visual Settings</span>
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Icon</label>
                      <select
                        name="icon"
                        value={formData.icon}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                      >
                        {iconOptions.map((icon) => (
                          <option key={icon} value={icon}>
                            {icon}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Gradient</label>
                      <select
                        name="gradient"
                        value={formData.gradient}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                      >
                        {gradientOptions.map((gradient) => (
                          <option key={gradient} value={gradient}>
                            {gradient.replace("from-", "").replace("to-", " to ").replace("-", " ")}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <ImageIcon className="w-5 h-5 text-blue-400" />
                    <span>Product Images</span>
                  </h3>

                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Product Thumbnail</label>
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
                          <p className="text-gray-400 mb-4">Upload product thumbnail</p>
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
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-between pt-8 border-t border-gray-700/50">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setEditingProduct(null)
                      resetForm()
                    }}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Store</span>
                  </button>

                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-xl font-medium transition-all duration-300"
                    >
                      Reset Form
                    </button>

                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                    >
                      {uploading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          <span>{editingProduct ? "Update Product" : "Create Product"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, productId: null, productTitle: "" })}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${confirmModal.productTitle}"? This action cannot be undone.`}
        confirmText="Delete Product"
        type="danger"
      />

      <Footer />
    </div>
  )
}

export default AdminStorePage
    
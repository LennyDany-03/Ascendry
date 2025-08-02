"use client"

import { useState, useEffect } from "react"
import { supabase } from "../../../lib/supabase/client"
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
import { v4 as uuidv4 } from "uuid"

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
    downloadUrl: "",
    demoUrl: "",
    documentationUrl: "",
  })

  // Image file state for local storage and preview
  const [imageFile, setImageFile] = useState(null)

  // Preview URL state
  const [previewUrl, setPreviewUrl] = useState(null)

  const [techInput, setTechInput] = useState("")
  const [featureInput, setFeatureInput] = useState("")
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
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

        // Check admin access using user_id instead of email
        const { data: adminRecord, error } = await supabase
          .from("admin_access")
          .select("*")
          .eq("user_id", session.user.id)
          .eq("is_active", true)
          .single()

        if (error || !adminRecord) {
          console.error("Admin access denied:", error)

          // If no user_id match, try email as fallback and update user_id
          const { data: emailMatch, error: emailError } = await supabase
            .from("admin_access")
            .select("*")
            .eq("email", session.user.email)
            .eq("is_active", true)
            .single()

          if (emailError || !emailMatch) {
            await supabase.auth.signOut()
            router.push("/admin/login")
            return
          }

          // Update the record with user_id
          await supabase.from("admin_access").update({ user_id: session.user.id }).eq("email", session.user.email)

          setAdminData(emailMatch)
        } else {
          setAdminData(adminRecord)
        }

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

  // Load products from database
  const loadProducts = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error("Error loading products:", error)
      toast.error("Failed to load products")
    }
  }

  // Extract file path from Supabase Storage public URL
  const extractFilePathFromUrl = (url) => {
    if (!url) return null

    try {
      // Extract the file path from the public URL
      // URL format: https://[project-ref].supabase.co/storage/v1/object/public/product-images/filename.ext
      const urlParts = url.split("/storage/v1/object/public/product-images/")
      if (urlParts.length > 1) {
        return urlParts[1]
      }
      return null
    } catch (error) {
      console.error("Error extracting file path from URL:", error)
      return null
    }
  }

  // Delete images from Supabase Storage
  const deleteImagesFromStorage = async (product) => {
    const imagesToDelete = []

    // Collect thumbnail image URL from the product
    if (product.thumbnail) {
      const filePath = extractFilePathFromUrl(product.thumbnail)
      if (filePath) imagesToDelete.push(filePath)
    }

    // Delete images from storage if any exist
    if (imagesToDelete.length > 0) {
      try {
        const { error } = await supabase.storage.from("product-images").remove(imagesToDelete)

        if (error) {
          console.error("Error deleting images from storage:", error)
          // Don't throw error here - we still want to delete the product record
          // Just log the error and continue
        } else {
          console.log(`Successfully deleted ${imagesToDelete.length} images from storage`)
        }
      } catch (error) {
        console.error("Error deleting images from storage:", error)
        // Continue with product deletion even if image deletion fails
      }
    }
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

  // Handle image selection (store in local state and create preview)
  const handleImageChange = (file) => {
    if (!file) return

    // Store the file in local state
    setImageFile(file)

    // Create preview URL
    const previewUrl = URL.createObjectURL(file)
    setPreviewUrl(previewUrl)
  }

  // Remove image from local state and preview
  const removeImage = () => {
    // Revoke the object URL to free memory
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    setImageFile(null)
    setPreviewUrl(null)

    // Also clear the form data URL if it exists
    setFormData((prev) => ({
      ...prev,
      thumbnail: "",
    }))
  }

  // Upload image to Supabase Storage and return public URL
  const uploadImageToStorage = async (file, folder = "products") => {
    if (!file) return null

    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      const { error: uploadError } = await supabase.storage.from("product-images").upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from("product-images").getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error("Upload error:", error)
      throw new Error(`Failed to upload image: ${error.message}`)
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

      // Upload image if it exists
      let imageUrl = formData.thumbnail // Keep existing image URL if editing

      if (imageFile) {
        imageUrl = await uploadImageToStorage(imageFile)
      }

      const productData = {
        title: formData.title,
        description: formData.description,
        tech_stack: formData.techStack,
        price: formData.isFree ? 0 : Number.parseInt(formData.price) || 0,
        original_price: formData.originalPrice ? Number.parseInt(formData.originalPrice) : null,
        category: formData.category,
        is_popular: formData.isPopular,
        is_free: formData.isFree,
        thumbnail: imageUrl || null,
        gradient: formData.gradient,
        icon: formData.icon,
        features: formData.features,
        downloads: formData.downloads,
        rating: Number.parseFloat(formData.rating) || 4.5,
        complexity: formData.complexity,
        download_url: formData.downloadUrl || null,
        demo_url: formData.demoUrl || null,
        documentation_url: formData.documentationUrl || null,
        created_by: user.id,
        is_published: true,
      }

      if (editingProduct) {
        // Update existing product
        const { error } = await supabase.from("products").update(productData).eq("id", editingProduct.id)

        if (error) throw error
        toast.success("Product updated successfully!")
      } else {
        // Create new product
        const { error } = await supabase.from("products").insert([productData])

        if (error) throw error
        toast.success("Product created successfully!")
      }

      // Reload products and reset form
      await loadProducts()
      setTimeout(() => {
        setShowForm(false)
        setEditingProduct(null)
        resetForm()
      }, 1000)
    } catch (error) {
      console.error("Save error:", error)
      toast.error(`Error saving product: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  // Reset form and clear all states
  const resetForm = () => {
    // Revoke object URL to free memory
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

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
      downloadUrl: "",
      demoUrl: "",
      documentationUrl: "",
    })

    setImageFile(null)
    setPreviewUrl(null)
    setTechInput("")
    setFeatureInput("")
  }

  // Handle edit
  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      title: product.title || "",
      description: product.description || "",
      techStack: Array.isArray(product.tech_stack) ? product.tech_stack : [],
      price: product.price?.toString() || "",
      originalPrice: product.original_price?.toString() || "",
      category: product.category || "template",
      isPopular: product.is_popular || false,
      isFree: product.is_free || false,
      thumbnail: product.thumbnail || "",
      gradient: product.gradient || "from-blue-500 to-purple-500",
      icon: product.icon || "Code",
      features: Array.isArray(product.features) ? product.features : [],
      downloads: product.downloads || "0+",
      rating: product.rating?.toString() || "4.5",
      complexity: product.complexity || "Intermediate",
      downloadUrl: product.download_url || "",
      demoUrl: product.demo_url || "",
      documentationUrl: product.documentation_url || "",
    })

    // Clear any existing file states and previews when editing
    setImageFile(null)
    setPreviewUrl(null)

    setShowForm(true)
  }

  // Handle delete confirmation
  const handleDeleteClick = (product) => {
    setConfirmModal({
      isOpen: true,
      productId: product.id,
      productTitle: product.title || "Untitled Product",
    })
  }

  // Handle delete with image cleanup
  const handleDelete = async () => {
    setDeleting(true)

    try {
      // First, get the product data to access image URLs
      const productToDelete = products.find((p) => p.id === confirmModal.productId)

      if (!productToDelete) {
        throw new Error("Product not found")
      }

      // Delete associated images from storage first
      await deleteImagesFromStorage(productToDelete)

      // Then delete the product record from database
      const { error } = await supabase.from("products").delete().eq("id", confirmModal.productId)

      if (error) throw error

      // Reload products and show success message
      await loadProducts()
      toast.success("Product and associated images deleted successfully!")

      // Close the confirmation modal
      setConfirmModal({ isOpen: false, productId: null, productTitle: "" })
    } catch (error) {
      console.error("Delete error:", error)
      toast.error(`Failed to delete product: ${error.message}`)
    } finally {
      setDeleting(false)
    }
  }

  // Filter products with null safety
  const filteredProducts = products.filter((product) => {
    const title = product.title || ""
    const description = product.description || ""
    const category = product.category || ""

    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || category === selectedCategory
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
    "MessageSquare",
    "Briefcase",
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

  // Image upload component
  const ImageUploadField = ({ label, currentUrl }) => {
    const hasPreview = previewUrl
    const hasExistingImage = currentUrl && !hasPreview
    const displayUrl = hasPreview ? previewUrl : hasExistingImage ? currentUrl : null

    return (
      <div>
        <label className="block text-gray-300 font-medium mb-2">{label}</label>
        <div className="border-2 border-dashed border-gray-700/50 rounded-xl p-6 text-center hover:border-gray-600/50 transition-colors duration-300">
          {displayUrl ? (
            <div className="space-y-4">
              <img
                src={displayUrl || "/placeholder.svg"}
                alt={`${label} preview`}
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={removeImage}
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
                onChange={(e) => handleImageChange(e.target.files[0])}
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
    )
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
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${product.gradient || "from-blue-500 to-purple-500"} opacity-20`}
                        ></div>
                        {product.thumbnail ? (
                          <img
                            src={product.thumbnail || "/placeholder.svg"}
                            alt={product.title || "Product"}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none"
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl opacity-40">📦</div>
                          </div>
                        )}

                        {/* Popular Badge */}
                        {product.is_popular && (
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
                            {product.is_free ? (
                              <span className="text-green-400 font-bold text-lg flex items-center space-x-1">
                                <Gift className="w-4 h-4" />
                                <span>FREE</span>
                              </span>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <span className="text-white font-bold text-lg">₹{product.price || 0}</span>
                                {product.original_price && (
                                  <span className="text-gray-400 line-through text-sm">₹{product.original_price}</span>
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
                            disabled={deleting}
                            className="w-8 h-8 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg flex items-center justify-center transition-colors duration-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Product Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-blue-400 text-xs font-medium uppercase tracking-wider">
                            {product.category || "Product"}
                          </span>
                          <div className="flex items-center space-x-1 text-yellow-400">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-xs">{product.rating || "4.5"}</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">{product.title || "Untitled Product"}</h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {product.description || "No description available"}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {(Array.isArray(product.tech_stack) ? product.tech_stack : [])
                            .slice(0, 3)
                            .map((tech, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 text-gray-300 text-xs rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          {(Array.isArray(product.tech_stack) ? product.tech_stack : []).length > 3 && (
                            <span className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 text-gray-300 text-xs rounded">
                              +{product.tech_stack.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1 text-blue-400">
                            <Download className="w-3 h-3" />
                            <span>{product.downloads || "0+"}</span>
                          </div>
                          <div className="text-gray-400">{product.complexity || "Intermediate"}</div>
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

                {/* URLs */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-blue-400" />
                    <span>Product URLs</span>
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Download URL</label>
                      <input
                        type="url"
                        name="downloadUrl"
                        value={formData.downloadUrl}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        placeholder="https://..."
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Demo URL</label>
                      <input
                        type="url"
                        name="demoUrl"
                        value={formData.demoUrl}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        placeholder="https://..."
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Documentation URL</label>
                      <input
                        type="url"
                        name="documentationUrl"
                        value={formData.documentationUrl}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        placeholder="https://..."
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

                  <ImageUploadField label="Product Thumbnail" currentUrl={formData.thumbnail} />
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
        message={`Are you sure you want to delete "${confirmModal.productTitle}"? This action will permanently delete the product and all associated images.`}
        confirmText={deleting ? "Deleting..." : "Delete Product"}
        type="danger"
        loading={deleting}
      />

      <Footer />
    </div>
  )
}

export default AdminStorePage

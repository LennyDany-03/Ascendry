"use client"

import { useState, useEffect } from "react"
import { supabase } from "../../../lib/supabaseClient"
import Navbar from "../../../components/navbar.jsx"
import Footer from "../../../components/footer.jsx"
import InteractiveBackground from "../../../components/interactive-background"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Briefcase,
  Code,
  Globe,
  Smartphone,
  Database,
  Palette,
  ShoppingCart,
  Brain,
  Target,
  Star,
  ExternalLink,
  Github,
  ArrowLeft,
  Save,
  X,
  Upload,
  ImageIcon,
  FileText,
} from "lucide-react"
import ConfirmationModal from "../../../components/confirmation-modal"
import { useToast } from "../../../components/toast"

const AdminProjectsPage = () => {
  const [user, setUser] = useState(null)
  const [adminData, setAdminData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    longDescription: "",
    techStack: [],
    githubUrl: "",
    liveUrl: "",
    category: "",
    status: "Live",
    duration: "",
    year: new Date().getFullYear().toString(),
    thumbnail: "",
    gradient: "from-blue-500 to-purple-500",
    icon: "Code",
    features: [],
    metrics: { users: "", projects: "", satisfaction: "" },
    complexity: "Medium",
    impact: "",
    caseStudyImage1: "",
    caseStudyImage2: "",
  })
  const [techInput, setTechInput] = useState("")
  const [featureInput, setFeatureInput] = useState("")
  const [uploading, setUploading] = useState(false)
  const toast = useToast()
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, projectId: null, projectTitle: "" })
  const router = useRouter()

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
        await loadProjects()
      } catch (error) {
        console.error("Auth check error:", error)
        router.push("/admin/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  // Load projects from database (mock data for now)
  const loadProjects = async () => {
    // Mock data - replace with actual Supabase query
    const mockProjects = [
      {
        id: "club-sphere",
        title: "Club Sphere",
        subtitle: "College Club Management System",
        description: "A comprehensive full-stack solution that revolutionizes how college clubs operate.",
        longDescription:
          "Built to solve the complex challenges of managing multiple college clubs with thousands of students. This platform provides a centralized hub for event management, member coordination, and administrative tasks.",
        techStack: ["React", "Supabase", "Razorpay", "Tailwind CSS", "Node.js"],
        githubUrl: "https://github.com/example/club-sphere",
        liveUrl: "https://clubsphere.demo.com",
        category: "Full-Stack",
        status: "Live",
        duration: "3 months",
        year: "2024",
        thumbnail: "/placeholder.svg?height=300&width=500",
        gradient: "from-blue-500 via-purple-500 to-pink-500",
        icon: "Users",
        features: ["Event Management", "Payment Integration", "Real-time Notifications", "Admin Dashboard"],
        metrics: { users: "500+", projects: "100+", satisfaction: "98%" },
        complexity: "High",
        impact: "Streamlined club operations for 10+ colleges",
        caseStudyImage1: "/placeholder.svg?height=400&width=600",
        caseStudyImage2: "/placeholder.svg?height=400&width=600",
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z",
      },
    ]
    setProjects(mockProjects)
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith("metrics.")) {
      const metricKey = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        metrics: { ...prev.metrics, [metricKey]: value },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
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
      // Mock save - replace with actual Supabase insert/update
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (editingProject) {
        // Update existing project
        setProjects((prev) =>
          prev.map((p) =>
            p.id === editingProject.id
              ? { ...formData, id: editingProject.id, updated_at: new Date().toISOString() }
              : p,
          ),
        )
        toast.success("Project updated successfully!")
      } else {
        // Create new project
        const newProject = {
          ...formData,
          id: `project-${Date.now()}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        setProjects((prev) => [newProject, ...prev])
        toast.success("Project created successfully!")
      }

      // Reset form
      setTimeout(() => {
        setShowForm(false)
        setEditingProject(null)
        resetForm()
      }, 2000)
    } catch (error) {
      console.error("Save error:", error)
      toast.error("Error saving project. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      longDescription: "",
      techStack: [],
      githubUrl: "",
      liveUrl: "",
      category: "",
      status: "Live",
      duration: "",
      year: new Date().getFullYear().toString(),
      thumbnail: "",
      gradient: "from-blue-500 to-purple-500",
      icon: "Code",
      features: [],
      metrics: { users: "", projects: "", satisfaction: "" },
      complexity: "Medium",
      impact: "",
      caseStudyImage1: "",
      caseStudyImage2: "",
    })
    setTechInput("")
    setFeatureInput("")
  }

  // Handle edit
  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData(project)
    setShowForm(true)
  }

  // Handle delete confirmation
  const handleDeleteClick = (project) => {
    setConfirmModal({
      isOpen: true,
      projectId: project.id,
      projectTitle: project.title,
    })
  }

  // Handle delete
  const handleDelete = async () => {
    try {
      setProjects((prev) => prev.filter((p) => p.id !== confirmModal.projectId))
      toast.success("Project deleted successfully!")
    } catch (error) {
      toast.error("Failed to delete project")
    }
  }

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [
    { id: "all", name: "All Projects", icon: Briefcase },
    { id: "Full-Stack", name: "Full-Stack", icon: Code },
    { id: "Mobile App", name: "Mobile App", icon: Smartphone },
    { id: "Website", name: "Website", icon: Globe },
    { id: "AI/ML", name: "AI/ML", icon: Brain },
    { id: "E-commerce", name: "E-commerce", icon: ShoppingCart },
    { id: "UI/UX", name: "UI/UX", icon: Palette },
    { id: "Database", name: "Database", icon: Database },
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">Loading Projects...</h1>
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
              <span className="text-blue-400 font-medium">Projects</span>
            </div>
          </nav>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100">
                MANAGE PROJECTS
              </h1>
              <p className="text-xl text-gray-400">Create and manage your portfolio projects</p>
            </div>

            <button
              onClick={() => {
                resetForm()
                setShowForm(true)
                setEditingProject(null)
              }}
              className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Project</span>
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
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

      {/* Projects Grid */}
      {!showForm && (
        <section className="py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            {filteredProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-600/50 transition-all duration-300"
                  >
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`}></div>
                      {project.thumbnail ? (
                        <img
                          src={project.thumbnail || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-6xl opacity-40">💻</div>
                        </div>
                      )}

                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <div
                          className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            project.status === "Live"
                              ? "bg-green-500/20 border border-green-500/30 text-green-400"
                              : "bg-yellow-500/20 border border-yellow-500/30 text-yellow-400"
                          }`}
                        >
                          {project.status}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => handleEdit(project)}
                          className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors duration-300"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(project)}
                          className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center transition-colors duration-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-blue-400 text-xs font-medium uppercase tracking-wider">
                          {project.category}
                        </span>
                        <span className="text-gray-400 text-xs">{project.year}</span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.techStack.slice(0, 3).map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 text-gray-300 text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 text-gray-300 text-xs rounded">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Links */}
                      <div className="flex items-center space-x-4 text-sm">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-400 hover:text-green-300 flex items-center space-x-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Live</span>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white flex items-center space-x-1"
                          >
                            <Github className="w-3 h-3" />
                            <span>Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-900/50 border border-gray-700/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">No projects found</h3>
                <p className="text-gray-400 mb-8">
                  {searchQuery || selectedCategory !== "all"
                    ? "Try adjusting your search or filters"
                    : "Create your first project to get started"}
                </p>
                <button
                  onClick={() => {
                    resetForm()
                    setShowForm(true)
                    setEditingProject(null)
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                >
                  Create First Project
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Project Form */}
      {showForm && (
        <section className="py-12 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
              {/* Form Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {editingProject ? "Edit Project" : "Create New Project"}
                  </h2>
                  <p className="text-gray-400">
                    {editingProject ? "Update project details" : "Add a new project to your portfolio"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setEditingProject(null)
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
                        Project Title <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        placeholder="Enter project title"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Subtitle</label>
                      <input
                        type="text"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        placeholder="Brief subtitle"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      Short Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300 resize-none"
                      placeholder="Brief description for project cards"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      Long Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="longDescription"
                      value={formData.longDescription}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300 resize-none"
                      placeholder="Detailed description for case studies and project pages"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <Briefcase className="w-5 h-5 text-blue-400" />
                    <span>Project Details</span>
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">
                        Category <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                      >
                        <option value="">Select category</option>
                        <option value="Full-Stack">Full-Stack</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="Website">Website</option>
                        <option value="AI/ML">AI/ML</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="UI/UX">UI/UX</option>
                        <option value="Database">Database</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                      >
                        <option value="Live">Live</option>
                        <option value="In Development">In Development</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Complexity</label>
                      <select
                        name="complexity"
                        value={formData.complexity}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Very High">Very High</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        placeholder="e.g., 3 months"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Year</label>
                      <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        placeholder="2024"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Impact Statement</label>
                    <input
                      type="text"
                      name="impact"
                      value={formData.impact}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                      placeholder="e.g., Streamlined club operations for 10+ colleges"
                    />
                  </div>
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

                {/* Metrics */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-400" />
                    <span>Project Metrics</span>
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Users/Downloads</label>
                      <input
                        type="text"
                        name="metrics.users"
                        value={formData.metrics.users}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        placeholder="e.g., 500+"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Projects/Events</label>
                      <input
                        type="text"
                        name="metrics.projects"
                        value={formData.metrics.projects}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        placeholder="e.g., 100+"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Satisfaction Rate</label>
                      <input
                        type="text"
                        name="metrics.satisfaction"
                        value={formData.metrics.satisfaction}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        placeholder="e.g., 98%"
                      />
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <ExternalLink className="w-5 h-5 text-blue-400" />
                    <span>Project Links</span>
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Live URL</label>
                      <input
                        type="url"
                        name="liveUrl"
                        value={formData.liveUrl}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-medium mb-2">GitHub URL</label>
                      <input
                        type="url"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        placeholder="https://github.com/username/repo"
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

                {/* Image Uploads */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <ImageIcon className="w-5 h-5 text-blue-400" />
                    <span>Images</span>
                  </h3>

                  {/* Thumbnail */}
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Project Thumbnail</label>
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
                          <p className="text-gray-400 mb-4">Upload project thumbnail</p>
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

                  {/* Case Study Images */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Case Study Image 1 */}
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Case Study Image 1</label>
                      <div className="border-2 border-dashed border-gray-700/50 rounded-xl p-4 text-center hover:border-gray-600/50 transition-colors duration-300">
                        {formData.caseStudyImage1 ? (
                          <div className="space-y-3">
                            <img
                              src={formData.caseStudyImage1 || "/placeholder.svg"}
                              alt="Case study 1 preview"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, caseStudyImage1: "" }))}
                              className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div>
                            <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-400 text-sm mb-3">Case study image</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e.target.files[0], "caseStudyImage1")}
                              className="hidden"
                              id="case-study-1-upload"
                            />
                            <label
                              htmlFor="case-study-1-upload"
                              className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg cursor-pointer transition-colors duration-300 text-sm"
                            >
                              Upload
                            </label>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Case Study Image 2 */}
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Case Study Image 2</label>
                      <div className="border-2 border-dashed border-gray-700/50 rounded-xl p-4 text-center hover:border-gray-600/50 transition-colors duration-300">
                        {formData.caseStudyImage2 ? (
                          <div className="space-y-3">
                            <img
                              src={formData.caseStudyImage2 || "/placeholder.svg"}
                              alt="Case study 2 preview"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, caseStudyImage2: "" }))}
                              className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div>
                            <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-400 text-sm mb-3">Case study image</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e.target.files[0], "caseStudyImage2")}
                              className="hidden"
                              id="case-study-2-upload"
                            />
                            <label
                              htmlFor="case-study-2-upload"
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

                {/* Form Actions */}
                <div className="flex items-center justify-between pt-8 border-t border-gray-700/50">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setEditingProject(null)
                      resetForm()
                    }}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Projects</span>
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
                          <span>{editingProject ? "Update Project" : "Create Project"}</span>
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
        onClose={() => setConfirmModal({ isOpen: false, projectId: null, projectTitle: "" })}
        onConfirm={handleDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${confirmModal.projectTitle}"? This action cannot be undone.`}
        confirmText="Delete Project"
        type="danger"
      />

      <Footer />
    </div>
  )
}

export default AdminProjectsPage

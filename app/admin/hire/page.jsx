"use client"

import { useState, useEffect } from "react"
import { supabase } from "../../../lib/supabase/client"
import { hireMeAPI } from "../../../lib/api"
import Navbar from "../../../components/navbar.jsx"
import Footer from "../../../components/footer.jsx"
import InteractiveBackground from "../../../components/interactive-background"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "../../../components/toast"
import {
  Users,
  Mail,
  Calendar,
  Clock,
  Building,
  FileText,
  DollarSign,
  MessageSquare,
  Eye,
  Trash2,
  Search,
  AlertCircle,
  CheckCircle,
  XCircle,
  Home,
  Shield,
  ArrowLeft,
  ExternalLink,
  User,
  Briefcase,
  Target,
  Timer,
  Tag,
  Flag,
  RefreshCw,
  Download,
  Paperclip,
  X,
  ZoomIn,
  FileIcon,
  ImageIcon,
} from "lucide-react"

const AdminHirePage = () => {
  const [user, setUser] = useState(null)
  const [adminData, setAdminData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hireRequests, setHireRequests] = useState([])
  const [stats, setStats] = useState({})
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showFilePreview, setShowFilePreview] = useState(false)
  const [previewFile, setPreviewFile] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("created_at")
  const [sortOrder, setSortOrder] = useState("desc")
  const [updating, setUpdating] = useState(false)
  const [fileUrls, setFileUrls] = useState({})
  const [loadingFiles, setLoadingFiles] = useState({})
  const router = useRouter()
  const toast = useToast()

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
        await loadHireRequests()
        await loadStats()
      } catch (error) {
        console.error("Auth check error:", error)
        router.push("/admin/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const loadHireRequests = async () => {
    try {
      const api = hireMeAPI(supabase)
      const data = await api.getAll()
      setHireRequests(data)
    } catch (error) {
      console.error("Error loading hire requests:", error)
    }
  }

  const loadStats = async () => {
    try {
      const api = hireMeAPI(supabase)
      const statsData = await api.getStats()
      setStats(statsData)
    } catch (error) {
      console.error("Error loading stats:", error)
    }
  }

  const loadFileUrl = async (filePath) => {
    if (fileUrls[filePath] || loadingFiles[filePath]) return fileUrls[filePath]

    setLoadingFiles((prev) => ({ ...prev, [filePath]: true }))

    try {
      const api = hireMeAPI(supabase)
      const url = await api.getFileUrl(filePath)
      setFileUrls((prev) => ({ ...prev, [filePath]: url }))
      return url
    } catch (error) {
      console.error("Error loading file URL:", error)
      return null
    } finally {
      setLoadingFiles((prev) => ({ ...prev, [filePath]: false }))
    }
  }

  const handleStatusUpdate = async (id, newStatus) => {
    setUpdating(true)
    try {
      const api = hireMeAPI(supabase)
      await api.update(id, {
        status: newStatus,
        responded_at: newStatus !== "new" ? new Date().toISOString() : null,
      })
      await loadHireRequests()
      await loadStats()
      if (selectedRequest?.id === id) {
        const updatedRequest = await api.getById(id)
        setSelectedRequest(updatedRequest)
      }
      toast.success("Status updated successfully")
    } catch (error) {
      console.error("Error updating status:", error)
      toast.error("Failed to update status. Please try again.")
    } finally {
      setUpdating(false)
    }
  }

  const handlePriorityUpdate = async (id, newPriority) => {
    setUpdating(true)
    try {
      const api = hireMeAPI(supabase)
      await api.update(id, { priority: newPriority })
      await loadHireRequests()
      await loadStats()
      if (selectedRequest?.id === id) {
        const updatedRequest = await api.getById(id)
        setSelectedRequest(updatedRequest)
      }
      toast.success("Priority updated successfully")
    } catch (error) {
      console.error("Error updating priority:", error)
      toast.error("Failed to update priority. Please try again.")
    } finally {
      setUpdating(false)
    }
  }

  const handleNotesUpdate = async (id, notes) => {
    setUpdating(true)
    try {
      const api = hireMeAPI(supabase)
      await api.update(id, { admin_notes: notes })
      await loadHireRequests()
      if (selectedRequest?.id === id) {
        const updatedRequest = await api.getById(id)
        setSelectedRequest(updatedRequest)
      }
      toast.success("Notes updated successfully")
    } catch (error) {
      console.error("Error updating notes:", error)
      toast.error("Failed to update notes. Please try again.")
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this hire request? This will also delete all associated files.")) {
      try {
        const api = hireMeAPI(supabase)
        await api.delete(id)
        await loadHireRequests()
        await loadStats()
        setShowModal(false)
        setSelectedRequest(null)
        toast.success("Hire request deleted successfully")
      } catch (error) {
        console.error("Error deleting request:", error)
        toast.error("Failed to delete hire request. Please try again.")
      }
    }
  }

  const handleFileDelete = async (requestId, filePath) => {
    if (confirm("Are you sure you want to delete this file?")) {
      try {
        const api = hireMeAPI(supabase)
        await api.deleteFile(requestId, filePath)
        const updatedRequest = await api.getById(requestId)
        setSelectedRequest(updatedRequest)
        await loadHireRequests()

        // Remove from local state
        setFileUrls((prev) => {
          const newUrls = { ...prev }
          delete newUrls[filePath]
          return newUrls
        })
        toast.success("File deleted successfully")
      } catch (error) {
        console.error("Error deleting file:", error)
        toast.error("Failed to delete file. Please try again.")
      }
    }
  }

  const downloadFile = async (filePath, fileName) => {
    try {
      let url = fileUrls[filePath]
      if (!url) {
        url = await loadFileUrl(filePath)
      }

      if (url) {
        // Create a temporary link and trigger download
        const link = document.createElement("a")
        link.href = url
        link.download = fileName || filePath.split("/").pop()
        link.target = "_blank"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success("File download started")
      } else {
        toast.error("Unable to download file. Please try again.")
      }
    } catch (error) {
      console.error("Error downloading file:", error)
      toast.error("Error downloading file. Please try again.")
    }
  }

  const previewFileInModal = async (filePath, fileName) => {
    try {
      let url = fileUrls[filePath]
      if (!url) {
        url = await loadFileUrl(filePath)
      }

      if (url) {
        setPreviewFile({
          path: filePath,
          name: fileName,
          url: url,
          type: getFileType(filePath),
        })
        setShowFilePreview(true)
      } else {
        toast.error("Unable to preview file. Please try again.")
      }
    } catch (error) {
      console.error("Error previewing file:", error)
      toast.error("Error previewing file. Please try again.")
    }
  }

  const getFileName = (filePath) => {
    return filePath
      .split("/")
      .pop()
      .replace(/^\d+-\d+\./, "")
  }

  const getFileExtension = (filePath) => {
    return filePath.split(".").pop().toUpperCase()
  }

  const getFileType = (filePath) => {
    const ext = filePath.split(".").pop().toLowerCase()
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image"
    if (ext === "pdf") return "pdf"
    if (["doc", "docx"].includes(ext)) return "document"
    if (["xls", "xlsx"].includes(ext)) return "spreadsheet"
    if (["zip", "rar"].includes(ext)) return "archive"
    return "file"
  }

  const getFileIcon = (type) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-5 h-5" />
      case "pdf":
        return <FileText className="w-5 h-5" />
      case "document":
        return <FileText className="w-5 h-5" />
      case "spreadsheet":
        return <FileText className="w-5 h-5" />
      case "archive":
        return <FileIcon className="w-5 h-5" />
      default:
        return <FileIcon className="w-5 h-5" />
    }
  }

  const filteredRequests = hireRequests
    .filter((request) => {
      if (filterStatus !== "all" && request.status !== filterStatus) return false
      if (filterPriority !== "all" && request.priority !== filterPriority) return false
      if (
        searchTerm &&
        !request.full_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !request.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !request.project_type.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false
      return true
    })
    .sort((a, b) => {
      const aVal = a[sortBy]
      const bVal = b[sortBy]
      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "in_review":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "contacted":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "in_progress":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      case "medium":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "urgent":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">Loading Hire Requests...</h1>
          <p className="text-gray-400">Fetching data from database</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <InteractiveBackground />
      <Navbar />

      {/* File Preview Modal */}
      {showFilePreview && previewFile && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowFilePreview(false)} />
          <div className="relative bg-gray-900 border border-gray-700 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  {getFileIcon(previewFile.type)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{previewFile.name}</h3>
                  <p className="text-gray-400 text-sm">{getFileExtension(previewFile.path)} File</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => downloadFile(previewFile.path, previewFile.name)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => setShowFilePreview(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-300 p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 max-h-[calc(90vh-120px)] overflow-auto">
              {previewFile.type === "image" ? (
                <div className="flex justify-center">
                  <img
                    src={previewFile.url || "/placeholder.svg"}
                    alt={previewFile.name}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    onError={(e) => {
                      e.target.style.display = "none"
                      e.target.nextSibling.style.display = "block"
                    }}
                  />
                  <div className="hidden text-center text-gray-400">
                    <FileIcon className="w-16 h-16 mx-auto mb-4" />
                    <p>Unable to preview this image</p>
                  </div>
                </div>
              ) : previewFile.type === "pdf" ? (
                <div className="w-full h-[600px]">
                  <iframe
                    src={previewFile.url}
                    className="w-full h-full rounded-lg"
                    title={previewFile.name}
                    onError={() => {
                      console.log("PDF preview failed")
                    }}
                  />
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-700/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {getFileIcon(previewFile.type)}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Preview Not Available</h3>
                  <p className="text-gray-400 mb-6">
                    This file type cannot be previewed in the browser. Click download to view the file.
                  </p>
                  <button
                    onClick={() => downloadFile(previewFile.path, previewFile.name)}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all duration-300 mx-auto"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download File</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowModal(false)} />
          <div className="relative bg-gray-900 border border-gray-700 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedRequest.full_name}</h2>
                    <p className="text-gray-400">{selectedRequest.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-300 p-2"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Status and Priority Controls */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-3">
                  <label className="block text-gray-300 font-medium">Status</label>
                  <select
                    value={selectedRequest.status}
                    onChange={(e) => handleStatusUpdate(selectedRequest.id, e.target.value)}
                    disabled={updating}
                    className="w-full bg-black/40 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                  >
                    <option value="new">New</option>
                    <option value="in_review">In Review</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="block text-gray-300 font-medium">Priority</label>
                  <select
                    value={selectedRequest.priority}
                    onChange={(e) => handlePriorityUpdate(selectedRequest.id, e.target.value)}
                    disabled={updating}
                    className="w-full bg-black/40 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Project Details */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div className="bg-gray-800/30 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Contact Information</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{selectedRequest.email}</span>
                      </div>
                      {selectedRequest.company && (
                        <div className="flex items-center space-x-3">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{selectedRequest.company}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{selectedRequest.contact_method}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/30 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span>Availability</span>
                    </h3>
                    <div className="space-y-3">
                      {selectedRequest.available_date && (
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">
                            {new Date(selectedRequest.available_date).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      {selectedRequest.available_time && (
                        <div className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{selectedRequest.available_time}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-800/30 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                      <Briefcase className="w-5 h-5" />
                      <span>Project Details</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Target className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{selectedRequest.project_type}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{selectedRequest.budget}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Timer className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{selectedRequest.timeline}</span>
                      </div>
                      {selectedRequest.hear_about && (
                        <div className="flex items-center space-x-3">
                          <Tag className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">Found via: {selectedRequest.hear_about}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-800/30 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>Timeline</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-400">Submitted:</span>
                        <span className="text-gray-300">{formatDate(selectedRequest.created_at)}</span>
                      </div>
                      {selectedRequest.responded_at && (
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-400">Responded:</span>
                          <span className="text-gray-300">{formatDate(selectedRequest.responded_at)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Project Description</span>
                </h3>
                <div className="bg-gray-800/30 rounded-2xl p-6">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {selectedRequest.project_description}
                  </p>
                </div>
              </div>

              {/* File Attachments */}
              {selectedRequest.attachment_paths && selectedRequest.attachment_paths.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                    <Paperclip className="w-5 h-5" />
                    <span>File Attachments ({selectedRequest.attachment_paths.length})</span>
                  </h3>
                  <div className="bg-gray-800/30 rounded-2xl p-6">
                    <div className="grid gap-4">
                      {selectedRequest.attachment_paths.map((filePath, index) => {
                        const fileName = getFileName(filePath)
                        const fileExt = getFileExtension(filePath)
                        const fileType = getFileType(filePath)

                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600/30"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                {getFileIcon(fileType)}
                              </div>
                              <div>
                                <div className="text-gray-300 font-medium">{fileName}</div>
                                <div className="text-gray-500 text-sm">{fileExt} File</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => previewFileInModal(filePath, fileName)}
                                className="flex items-center space-x-2 px-3 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all duration-300"
                                disabled={loadingFiles[filePath]}
                              >
                                {loadingFiles[filePath] ? (
                                  <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <ZoomIn className="w-4 h-4" />
                                )}
                                <span>Preview</span>
                              </button>
                              <button
                                onClick={() => downloadFile(filePath, fileName)}
                                className="flex items-center space-x-2 px-3 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-all duration-300"
                              >
                                <Download className="w-4 h-4" />
                                <span>Download</span>
                              </button>
                              <button
                                onClick={() => handleFileDelete(selectedRequest.id, filePath)}
                                className="flex items-center space-x-2 px-3 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300"
                              >
                                <X className="w-4 h-4" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Admin Notes */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Admin Notes</span>
                </h3>
                <div className="bg-gray-800/30 rounded-2xl p-6">
                  <textarea
                    value={selectedRequest.admin_notes || ""}
                    onChange={(e) => handleNotesUpdate(selectedRequest.id, e.target.value)}
                    placeholder="Add internal notes about this request..."
                    rows={4}
                    className="w-full bg-black/40 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300 resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-700/50">
                <div className="flex items-center space-x-4">
                  <a
                    href={`mailto:${selectedRequest.email}?subject=Re: Your Project Inquiry&body=Hi ${selectedRequest.full_name},%0D%0A%0D%0AThank you for your interest in working together.%0D%0A%0D%0ABest regards`}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all duration-300"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Reply via Email</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <button
                  onClick={() => handleDelete(selectedRequest.id)}
                  className="flex items-center space-x-2 px-6 py-3 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/30 transition-all duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Request</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
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
              <span className="text-blue-400 font-medium">Hire Requests</span>
            </div>
          </nav>

          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100">
                    HIRE REQUESTS
                  </h1>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">{stats.new || 0} New Requests</span>
                  </div>
                </div>
              </div>
              <p className="text-xl text-gray-400">Manage client inquiries and project requests</p>
            </div>

            <Link
              href="/admin/dashboard"
              className="group bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg border border-gray-600/30"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 mb-12">
            {[
              { label: "Total", value: stats.total || 0, icon: Users, color: "from-blue-500 to-blue-600" },
              { label: "New", value: stats.new || 0, icon: AlertCircle, color: "from-blue-500 to-blue-600" },
              {
                label: "In Progress",
                value: stats.in_progress || 0,
                icon: RefreshCw,
                color: "from-orange-500 to-orange-600",
              },
              {
                label: "Completed",
                value: stats.completed || 0,
                icon: CheckCircle,
                color: "from-green-500 to-green-600",
              },
              { label: "High Priority", value: stats.high_priority || 0, icon: Flag, color: "from-red-500 to-red-600" },
              {
                label: "This Month",
                value: stats.this_month || 0,
                icon: Calendar,
                color: "from-purple-500 to-purple-600",
              },
            ].map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div
                  key={index}
                  className="relative group bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Filters and Search */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="block text-gray-300 font-medium text-sm">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, email, or project type..."
                    className="w-full bg-black/40 border border-gray-600/50 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-300 font-medium text-sm">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full bg-black/40 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="in_review">In Review</option>
                  <option value="contacted">Contacted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-300 font-medium text-sm">Priority</label>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="w-full bg-black/40 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                >
                  <option value="all">All Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-300 font-medium text-sm">Sort By</label>
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split("-")
                    setSortBy(field)
                    setSortOrder(order)
                  }}
                  className="w-full bg-black/40 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                >
                  <option value="created_at-desc">Newest First</option>
                  <option value="created_at-asc">Oldest First</option>
                  <option value="full_name-asc">Name A-Z</option>
                  <option value="full_name-desc">Name Z-A</option>
                  <option value="priority-desc">Priority High-Low</option>
                  <option value="status-asc">Status</option>
                </select>
              </div>
            </div>
          </div>

          {/* Requests Table */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50 border-b border-gray-700/50">
                  <tr>
                    <th className="text-left p-6 text-gray-300 font-medium">Client</th>
                    <th className="text-left p-6 text-gray-300 font-medium">Project</th>
                    <th className="text-left p-6 text-gray-300 font-medium">Budget</th>
                    <th className="text-left p-6 text-gray-300 font-medium">Status</th>
                    <th className="text-left p-6 text-gray-300 font-medium">Priority</th>
                    <th className="text-left p-6 text-gray-300 font-medium">Files</th>
                    <th className="text-left p-6 text-gray-300 font-medium">Date</th>
                    <th className="text-left p-6 text-gray-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request, index) => (
                    <tr
                      key={request.id}
                      className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors duration-300"
                    >
                      <td className="p-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {request.full_name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="text-white font-medium">{request.full_name}</div>
                            <div className="text-gray-400 text-sm">{request.email}</div>
                            {request.company && <div className="text-gray-500 text-xs">{request.company}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="text-white font-medium">{request.project_type}</div>
                        <div className="text-gray-400 text-sm">{request.timeline}</div>
                      </td>
                      <td className="p-6">
                        <div className="text-white font-medium">{request.budget}</div>
                      </td>
                      <td className="p-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}
                        >
                          {request.status.replace("_", " ").toUpperCase()}
                        </span>
                      </td>
                      <td className="p-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(request.priority)}`}
                        >
                          {request.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-6">
                        {request.attachment_paths && request.attachment_paths.length > 0 ? (
                          <div className="flex items-center space-x-2">
                            <Paperclip className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-400 text-sm font-medium">
                              {request.attachment_paths.length} file{request.attachment_paths.length > 1 ? "s" : ""}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-sm">No files</span>
                        )}
                      </td>
                      <td className="p-6">
                        <div className="text-gray-300 text-sm">{formatDate(request.created_at)}</div>
                      </td>
                      <td className="p-6">
                        <button
                          onClick={() => {
                            setSelectedRequest(request)
                            setShowModal(true)
                          }}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all duration-300"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredRequests.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No Requests Found</h3>
                  <p className="text-gray-400">
                    {searchTerm || filterStatus !== "all" || filterPriority !== "all"
                      ? "Try adjusting your filters"
                      : "No hire requests have been submitted yet"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AdminHirePage

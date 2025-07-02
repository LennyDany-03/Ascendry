"use client"

import { useState, useEffect } from "react"
import { supabase, hireMeAPI } from "../../../lib/supabaseClient"
import Navbar from "../../../components/navbar.jsx"
import Footer from "../../../components/footer.jsx"
import InteractiveBackground from "../../../components/interactive-background"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Shield,
  Users,
  FileText,
  ShoppingBag,
  Activity,
  Clock,
  AlertCircle,
  CheckCircle,
  Eye,
  ArrowRight,
  Home,
  Settings,
  BarChart3,
  Briefcase,
} from "lucide-react"

const AdminDashboard = () => {
  const [user, setUser] = useState(null)
  const [adminData, setAdminData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({})
  const [recentHireRequests, setRecentHireRequests] = useState([])
  const router = useRouter()

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
        await loadDashboardData()
      } catch (error) {
        console.error("Auth check error:", error)
        router.push("/admin/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const loadDashboardData = async () => {
    try {
      // Load hire request stats
      const hireStats = await hireMeAPI.getStats()
      setStats(hireStats)

      // Load recent hire requests
      const allRequests = await hireMeAPI.getAll()
      setRecentHireRequests(allRequests.slice(0, 5))
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

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

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">Loading Dashboard...</h1>
          <p className="text-gray-400">Fetching admin data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <InteractiveBackground />
      <Navbar />

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
              <span className="text-blue-400 font-medium flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </span>
            </div>
          </nav>

          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100">
                    ADMIN DASHBOARD
                  </h1>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">
                      Welcome back, {adminData?.name || user?.email}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xl text-gray-400">Manage your portfolio, projects, and client requests</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                label: "Total Requests",
                value: stats.total || 0,
                icon: Briefcase,
                color: "from-blue-500 to-blue-600",
                change: "+12%",
              },
              {
                label: "New Requests",
                value: stats.new || 0,
                icon: AlertCircle,
                color: "from-yellow-500 to-yellow-600",
                change: "+5%",
              },
              {
                label: "In Progress",
                value: stats.in_progress || 0,
                icon: Activity,
                color: "from-orange-500 to-orange-600",
                change: "+8%",
              },
              {
                label: "Completed",
                value: stats.completed || 0,
                icon: CheckCircle,
                color: "from-green-500 to-green-600",
                change: "+15%",
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
                      <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                    </div>
                    <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                <Settings className="w-6 h-6 text-blue-400" />
                <span>Quick Actions</span>
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    title: "Hire Requests",
                    description: "Manage client inquiries",
                    icon: Briefcase,
                    href: "/admin/hire",
                    color: "from-blue-500 to-purple-500",
                    badge: stats.new || 0,
                  },
                  {
                    title: "Projects",
                    description: "Manage portfolio projects",
                    icon: FileText,
                    href: "/admin/projects",
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    title: "Store",
                    description: "Manage digital products",
                    icon: ShoppingBag,
                    href: "/admin/store",
                    color: "from-pink-500 to-red-500",
                  },
                  {
                    title: "Blog",
                    description: "Manage blog posts",
                    icon: FileText,
                    href: "/admin/blog",
                    color: "from-green-500 to-blue-500",
                  },
                ].map((action, index) => {
                  const IconComponent = action.icon
                  return (
                    <Link
                      key={index}
                      href={action.href}
                      className="group relative bg-gray-800/30 hover:bg-gray-800/50 border border-gray-600/30 hover:border-gray-500/50 rounded-xl p-6 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        {action.badge && action.badge > 0 && (
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {action.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="text-white font-bold mb-2">{action.title}</h3>
                      <p className="text-gray-400 text-sm">{action.description}</p>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300 mt-2" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                <Activity className="w-6 h-6 text-green-400" />
                <span>Recent Hire Requests</span>
              </h2>
              <div className="space-y-4">
                {recentHireRequests.length > 0 ? (
                  recentHireRequests.map((request, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-600/30"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            {request.full_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">{request.full_name}</div>
                          <div className="text-gray-400 text-xs">{request.project_type}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}
                        >
                          {request.status.replace("_", " ").toUpperCase()}
                        </span>
                        <span className="text-gray-500 text-xs">{formatDate(request.created_at)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Briefcase className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No recent hire requests</p>
                  </div>
                )}
                {recentHireRequests.length > 0 && (
                  <Link
                    href="/admin/hire"
                    className="flex items-center justify-center space-x-2 w-full py-3 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View All Requests</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
              <BarChart3 className="w-6 h-6 text-purple-400" />
              <span>System Overview</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-white font-bold mb-2">System Status</h3>
                <p className="text-green-400 text-sm">All systems operational</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-white font-bold mb-2">Active Sessions</h3>
                <p className="text-blue-400 text-sm">1 admin session</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-white font-bold mb-2">Last Updated</h3>
                <p className="text-purple-400 text-sm">Just now</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AdminDashboard

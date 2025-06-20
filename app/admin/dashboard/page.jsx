"use client"

import { useState, useEffect } from "react"
import { supabase } from "../../../lib/supabaseClient"
import Navbar from "../../../components/navbar.jsx"
import Footer from "../../../components/footer.jsx"
import InteractiveBackground from "../../../components/interactive-background"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  Users,
  Briefcase,
  FileText,
  ShoppingBag,
  Settings,
  MessageSquare,
  Activity,
  LogOut,
  Shield,
  Home,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap,
  Crown,
} from "lucide-react"

const AdminDashboard = () => {
  const [user, setUser] = useState(null)
  const [adminData, setAdminData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [signingOut, setSigningOut] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showTickAnimation, setShowTickAnimation] = useState(false)
  const [stats, setStats] = useState({
    totalVisits: 1247,
    totalProjects: 6,
    totalBlogPosts: 8,
    totalProducts: 6,
  })
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
      } catch (error) {
        console.error("Auth check error:", error)
        router.push("/admin/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        setUser(null)
        setAdminData(null)
        router.push("/")
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showSuccessModal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [showSuccessModal])

  const handleSignOut = async () => {
    try {
      console.log("Starting sign out process...")
      setSigningOut(true)

      // Clear local storage and session storage
      localStorage.clear()
      sessionStorage.clear()

      // Sign out from Supabase
      const { error } = await supabase.auth.signOut({
        scope: "global", // Sign out from all sessions
      })

      if (error) {
        console.error("Supabase sign out error:", error)
        throw error
      }

      console.log("Supabase sign out successful")

      // Clear local state immediately
      setUser(null)
      setAdminData(null)

      // Show success modal
      setShowSuccessModal(true)
      setSigningOut(false)

      // Trigger tick animation after modal appears (increased from 300ms to 800ms)
      setTimeout(() => {
        setShowTickAnimation(true)
      }, 800)

      // Redirect after animation (increased from 2500ms to 6000ms - 6 seconds)
      setTimeout(() => {
        setShowSuccessModal(false)
        setShowTickAnimation(false)

        // Force navigation to home
        window.location.href = "/"
      }, 6000)
    } catch (error) {
      console.error("Sign out error:", error)
      setSigningOut(false)

      // Force sign out even if there's an error
      setUser(null)
      setAdminData(null)

      // Clear all storage
      localStorage.clear()
      sessionStorage.clear()

      // Show success modal anyway
      setShowSuccessModal(true)

      setTimeout(() => {
        window.location.href = "/"
      }, 2000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">Loading Dashboard...</h1>
          <p className="text-gray-400">Verifying admin access</p>
        </div>
      </div>
    )
  }

  const quickActions = [
    {
      title: "Manage Blog Posts",
      desc: "Create and edit blog content",
      icon: FileText,
      href: "/admin/blog",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      title: "Manage Projects",
      desc: "Update portfolio projects",
      icon: Briefcase,
      href: "/admin/projects",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
    },
    {
      title: "Manage Store",
      desc: "Add and edit products",
      icon: ShoppingBag,
      href: "/admin/store",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
    },
    {
      title: "View Analytics",
      desc: "Site performance metrics",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
    },
    {
      title: "User Messages",
      desc: "Contact form submissions",
      icon: MessageSquare,
      href: "/admin/messages",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/30",
    },
    {
      title: "Site Settings",
      desc: "General configuration",
      icon: Settings,
      href: "/admin/settings",
      color: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-500/10",
      borderColor: "border-gray-500/30",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative">
      <InteractiveBackground />
      <Navbar />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in" />

          {/* Modal Content */}
          <div className="relative bg-gray-900 border border-gray-700 rounded-3xl p-12 max-w-md mx-4 text-center animate-scale-in shadow-2xl">
            {/* Tick Animation */}
            <div className="mb-8">
              <div
                className={`w-24 h-24 mx-auto rounded-full border-4 border-green-500 flex items-center justify-center ${showTickAnimation ? "animate-tick-circle" : ""}`}
              >
                <CheckCircle
                  className={`w-12 h-12 text-green-500 ${showTickAnimation ? "animate-tick-draw" : "opacity-0"}`}
                />
              </div>
            </div>

            {/* Success Message */}
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-white">Signed Out Successfully!</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                You have been securely logged out. Redirecting you to home in a moment...
              </p>
              <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                See you next time! 👋
              </p>
            </div>
          </div>
        </div>
      )}

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
              <span className="text-blue-400 font-medium flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </span>
            </div>
          </nav>

          {/* Welcome Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100">
                    DASHBOARD
                  </h1>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">System Online</span>
                  </div>
                </div>
              </div>

              <p className="text-xl text-gray-400 mb-4">
                Welcome back, <span className="text-white font-semibold">{adminData?.full_name || user?.email}</span>
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Role: {adminData?.role}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    Last login:{" "}
                    {adminData?.last_login ? new Date(adminData.last_login).toLocaleDateString() : "First time"}
                  </span>
                </div>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="group bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg border border-red-500/30"
            >
              {signingOut ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing Out...</span>
                </>
              ) : (
                <>
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </>
              )}
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                label: "Total Visits",
                value: stats.totalVisits,
                icon: Users,
                color: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-500/10",
                borderColor: "border-blue-500/30",
              },
              {
                label: "Projects",
                value: stats.totalProjects,
                icon: Briefcase,
                color: "from-green-500 to-green-600",
                bgColor: "bg-green-500/10",
                borderColor: "border-green-500/30",
              },
              {
                label: "Blog Posts",
                value: stats.totalBlogPosts,
                icon: FileText,
                color: "from-purple-500 to-purple-600",
                bgColor: "bg-purple-500/10",
                borderColor: "border-purple-500/30",
              },
              {
                label: "Products",
                value: stats.totalProducts,
                icon: ShoppingBag,
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
                  {/* Background Gradient */}
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

          {/* Quick Actions */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-8">
              <Zap className="w-8 h-8 text-blue-500" />
              <h2 className="text-3xl font-bold text-white">Quick Actions</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon
                return (
                  <Link
                    key={index}
                    href={action.href}
                    className={`group relative ${action.bgColor} backdrop-blur-xl border ${action.borderColor} rounded-2xl p-6 hover:scale-105 transition-all duration-300 overflow-hidden`}
                  >
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>

                    <div className="relative z-10">
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                        {action.title}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                        {action.desc}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Activity className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {[
                { action: "New blog post published", time: "2 hours ago", type: "success", icon: FileText },
                { action: "Project updated: NovaPay", time: "1 day ago", type: "info", icon: Briefcase },
                { action: "New contact message received", time: "2 days ago", type: "warning", icon: MessageSquare },
                { action: "Store product added", time: "3 days ago", type: "success", icon: ShoppingBag },
              ].map((activity, index) => {
                const IconComponent = activity.icon
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-colors duration-300"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        activity.type === "success"
                          ? "bg-green-500/20 border border-green-500/30"
                          : activity.type === "warning"
                            ? "bg-yellow-500/20 border border-yellow-500/30"
                            : "bg-blue-500/20 border border-blue-500/30"
                      }`}
                    >
                      <IconComponent
                        className={`w-5 h-5 ${
                          activity.type === "success"
                            ? "text-green-400"
                            : activity.type === "warning"
                              ? "text-yellow-400"
                              : "text-blue-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.action}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="w-3 h-3 text-gray-500" />
                        <p className="text-gray-400 text-sm">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Emergency Sign Out Section */}
          <div className="mt-12 bg-red-900/20 border border-red-500/30 rounded-2xl p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-400 mb-2">Emergency Sign Out</h3>
                  <p className="text-gray-400">If the main sign out button doesn't work, use this emergency option.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  // Force sign out
                  localStorage.clear()
                  sessionStorage.clear()
                  supabase.auth.signOut()
                  window.location.href = "/"
                }}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2 border border-red-500/30"
              >
                <Zap className="w-5 h-5" />
                <span>Force Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.8) translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }

        @keyframes tick-circle {
          0% { 
            transform: scale(0.8); 
            border-color: #6b7280; 
          }
          50% { 
            transform: scale(1.1); 
            border-color: #10b981; 
          }
          100% { 
            transform: scale(1); 
            border-color: #10b981; 
          }
        }

        @keyframes tick-draw {
          0% { 
            opacity: 0;
            transform: scale(0.8);
          }
          50% { 
            opacity: 1;
            transform: scale(1.1);
          }
          100% { 
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.8s ease-out forwards;
        }

        .animate-tick-circle {
          animation: tick-circle 1.2s ease-out forwards;
        }

        .animate-tick-draw {
          animation: tick-draw 1.5s ease-out 0.8s forwards;
        }
      `}</style>
    </div>
  )
}

export default AdminDashboard

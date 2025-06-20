"use client"

import { useState, useEffect } from "react"
import { supabase } from "../../../lib/supabaseClient"
import Navbar from "../../../components/navbar.jsx"
import Footer from "../../../components/footer.jsx"
import InteractiveBackground from "../../../components/interactive-background"
import Link from "next/link"
import { useRouter } from "next/navigation"

const AdminLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showSuccess, setShowSuccess] = useState(false)
  const [showTickAnimation, setShowTickAnimation] = useState(false)
  const router = useRouter()

  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        // Check if user has admin access
        const { data: adminData } = await supabase
          .from("admin_access")
          .select("*")
          .eq("email", session.user.email)
          .eq("is_active", true)
          .single()

        if (adminData) {
          router.push("/contact")
        }
      }
    }

    checkUser()
  }, [router])

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/admin/auth/callback`,
        },
      })

      if (error) {
        console.error("Login error:", error.message)
        alert("Login failed: " + error.message)
        setIsLoading(false)
        return
      }

      // OAuth redirect will handle the rest
    } catch (error) {
      console.error("Unexpected error:", error)
      alert("An unexpected error occurred")
      setIsLoading(false)
    }
  }

  const showSuccessAnimation = () => {
    setShowSuccess(true)

    // Trigger tick animation after modal appears
    setTimeout(() => {
      setShowTickAnimation(true)
    }, 300)

    // Redirect after animation
    setTimeout(() => {
      router.push("/admin/dashboard")
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <InteractiveBackground />
      <Navbar />

      {/* Success Modal */}
      {showSuccess && (
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
                <svg
                  className={`w-12 h-12 text-green-500 ${showTickAnimation ? "animate-tick-draw" : "opacity-0"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                    className="tick-path"
                  />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-white">Login Successful!</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Welcome to the admin dashboard. Redirecting you now...
              </p>
              <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Access Granted! 🚀
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Mouse Follower */}
        <div
          className="absolute w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
          }}
        ></div>
      </div>

      {/* Main Content */}
      <section className="min-h-screen flex items-center justify-center relative z-10 px-6 py-32">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Branding & Info */}
            <div className="space-y-8">
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
                  <span className="text-blue-400 font-medium">Admin Portal</span>
                </div>
              </nav>

              {/* Main Heading */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                      <span className="text-white text-3xl font-black">A</span>
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl animate-pulse"></div>
                  </div>
                  <div>
                    <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100">
                      ADMIN
                    </h1>
                    <p className="text-xl text-gray-400 font-medium">PORTAL</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    Welcome to the
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      {" "}
                      Command Center
                    </span>
                  </h2>
                  <p className="text-lg text-gray-400 leading-relaxed max-w-md">
                    Secure access to Ascendry's administrative dashboard. Manage content, monitor analytics, and control
                    your digital empire.
                  </p>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                {[
                  { icon: "📊", title: "Analytics Dashboard", desc: "Real-time insights and metrics" },
                  { icon: "🛠️", title: "Content Management", desc: "Edit and publish with ease" },
                  { icon: "🔒", title: "Security Controls", desc: "Advanced access management" },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 bg-gray-900/50 border border-gray-700/50 rounded-xl flex items-center justify-center group-hover:bg-gray-800/50 group-hover:border-gray-600/50 transition-all duration-300">
                      <span className="text-xl">{feature.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-500 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>

              {/* Login Card */}
              <div className="relative bg-gray-900/40 backdrop-blur-2xl border border-gray-700/30 rounded-3xl p-8 md:p-12 shadow-2xl">
                {/* Card Header */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full mb-6">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">Secure Login</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">Administrator Access</h3>
                  <p className="text-gray-400">Sign in with your Google account</p>
                </div>

                {/* Google Login Button */}
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className={`group relative w-full bg-white hover:bg-gray-50 text-black font-semibold py-5 px-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden ${
                    isLoading ? "animate-pulse" : ""
                  }`}
                >
                  {/* Button Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10 flex items-center justify-center space-x-4">
                    {isLoading ? (
                      <>
                        <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-lg">Authenticating...</span>
                      </>
                    ) : (
                      <>
                        {/* Enhanced Google Icon */}
                        <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                        </div>
                        <span className="text-lg">Continue with Google</span>
                        <div className="w-6 h-6 flex items-center justify-center">
                          <span className="group-hover:translate-x-1 transition-transform duration-300 text-xl">→</span>
                        </div>
                      </>
                    )}
                  </div>
                </button>

                {/* Security Notice */}
                <div className="mt-8 p-6 bg-gradient-to-r from-gray-800/30 to-gray-700/30 border border-gray-600/30 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 text-lg">🛡️</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Enterprise Security</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Protected by advanced encryption and multi-factor authentication. Your access is logged and
                        monitored for security.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Links */}
                <div className="mt-8 flex items-center justify-between text-sm">
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                    <span>Back to Home</span>
                  </Link>

                  <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                    Need Help?
                  </Link>
                </div>
              </div>
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
            stroke-dasharray: 0 50;
          }
          50% { 
            opacity: 1;
            stroke-dasharray: 25 50;
          }
          100% { 
            opacity: 1;
            stroke-dasharray: 50 50;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out forwards;
        }

        .animate-tick-circle {
          animation: tick-circle 0.6s ease-out forwards;
        }

        .animate-tick-draw {
          animation: tick-draw 0.8s ease-out 0.3s forwards;
        }

        .tick-path {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default AdminLoginPage

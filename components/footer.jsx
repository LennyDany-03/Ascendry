"use client"

import { useState, useEffect } from "react"
import { supabase } from "../lib/supabaseClient"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  ExternalLink,
  ArrowUp,
  Home,
  Briefcase,
  ShoppingBag,
  FileText,
  MessageSquare,
  Settings,
  Shield,
  LogOut,
  BarChart3,
  Heart,
  Code,
  Zap,
  Globe,
  Sparkles,
  CheckCircle,
} from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [signingOut, setSigningOut] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showTickAnimation, setShowTickAnimation] = useState(false)
  const router = useRouter()

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          setUser(session.user)

          // Check if user is admin
          const { data: adminData } = await supabase
            .from("admin_access")
            .select("*")
            .eq("email", session.user.email)
            .eq("is_active", true)
            .maybeSingle()

          setIsAdmin(!!adminData)
        } else {
          setUser(null)
          setIsAdmin(false)
        }
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)

        // Check admin status
        const { data: adminData } = await supabase
          .from("admin_access")
          .select("*")
          .eq("email", session.user.email)
          .eq("is_active", true)
          .maybeSingle()

        setIsAdmin(!!adminData)
      } else {
        setUser(null)
        setIsAdmin(false)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

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
      console.log("Starting sign out process from footer...")
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
      setIsAdmin(false)

      // Show success modal
      setShowSuccessModal(true)
      setSigningOut(false)

      // Trigger tick animation after modal appears
      setTimeout(() => {
        setShowTickAnimation(true)
      }, 800)

      // Redirect after animation (6 seconds total)
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
      setIsAdmin(false)

      // Clear all storage
      localStorage.clear()
      sessionStorage.clear()

      // Show success modal anyway
      setShowSuccessModal(true)

      setTimeout(() => {
        setShowTickAnimation(true)
      }, 800)

      setTimeout(() => {
        setShowSuccessModal(false)
        setShowTickAnimation(false)
        window.location.href = "/"
      }, 6000)
    }
  }

  const closeModal = () => {
    setShowSuccessModal(false)
    setShowTickAnimation(false)
    window.location.href = "/"
  }

  const quickLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Services", href: "/services", icon: Settings },
    { name: "Projects", href: "/projects", icon: Briefcase },
    { name: "Store", href: "/store", icon: ShoppingBag },
    { name: "Blog", href: "/blog", icon: FileText },
    { name: "Contact", href: "/contact", icon: MessageSquare },
  ]

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/LennyDany-03",
      icon: Github,
      color: "hover:text-gray-300",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/lennydany",
      icon: Linkedin,
      color: "hover:text-blue-400",
    },
    {
      name: "Twitter",
      href: "#",
      icon: Twitter,
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      href: "#",
      icon: Instagram,
      color: "hover:text-pink-400",
    },
    {
      name: "Email",
      href: "mailto:lenny@ascendry.in",
      icon: Mail,
      color: "hover:text-green-400",
    },
  ]

  return (
    <footer className="bg-black border-t border-gray-800 relative overflow-hidden">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in" onClick={closeModal} />

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

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all duration-300 hover:scale-105"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(255,255,255,0.01)_50%,transparent_51%)] bg-[size:40px_40px]"></div>

      {/* Geometric Shapes with Lucide Icons */}
      <div className="absolute top-10 left-10 opacity-10">
        <Code className="w-16 h-16 text-blue-500 animate-pulse" />
      </div>
      <div className="absolute top-20 right-20 opacity-10">
        <Zap className="w-12 h-12 text-purple-500 animate-bounce" />
      </div>
      <div className="absolute bottom-10 left-1/3 opacity-10">
        <Sparkles className="w-8 h-8 text-blue-400 animate-spin-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative group">
                <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 rounded-xl w-12 h-12 flex items-center justify-center cursor-pointer shadow-lg">
                  <Globe className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100">
                ASCENDRY
              </span>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
              Transforming ideas into powerful digital solutions. Building the future, one line of code at a time.
            </p>

            {/* Motto */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start space-x-3">
                <Code className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <blockquote className="text-white font-medium text-lg italic">
                    "Code is poetry written in logic."
                  </blockquote>
                  <cite className="text-gray-400 text-sm mt-2 flex items-center space-x-2">
                    <Sparkles className="w-3 h-3" />
                    <span>— Ascendry Philosophy</span>
                  </cite>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6 relative flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-500" />
              <span>QUICK LINKS</span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => {
                const IconComponent = link.icon
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-all duration-300 flex items-center space-x-3 group py-2"
                    >
                      <div className="w-8 h-8 bg-gray-800/50 border border-gray-700/50 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-all duration-300">
                        <IconComponent className="w-4 h-4 group-hover:text-blue-400 transition-colors duration-300" />
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6 relative flex items-center space-x-2">
              <Globe className="w-5 h-5 text-blue-500" />
              <span>CONNECT</span>
            </h3>
            <div className="space-y-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : "_self"}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : ""}
                    className={`flex items-center space-x-3 text-gray-400 ${social.color} transition-all duration-300 group`}
                  >
                    <div className="w-10 h-10 bg-gray-900/50 border border-gray-700/50 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:bg-gray-800/50 group-hover:border-gray-600/50 transition-all duration-300">
                      <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">
                      {social.name}
                    </span>
                    {social.href.startsWith("http") && (
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              <p className="flex items-center space-x-2">
                <span>© {currentYear} Ascendry. All rights reserved.</span>
              </p>
              <p className="mt-1 flex items-center space-x-2">
                <span>Created with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>by Lenny</span>
              </p>
            </div>

            {/* Additional Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-1"
              >
                <Shield className="w-3 h-3" />
                <span>Privacy Policy</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-1"
              >
                <FileText className="w-3 h-3" />
                <span>Terms of Service</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-1"
              >
                <Globe className="w-3 h-3" />
                <span>Sitemap</span>
              </Link>
            </div>

            {/* Admin Section */}
            <div className="flex items-center space-x-4">
              {loading ? (
                <div className="w-6 h-6 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
              ) : user && isAdmin ? (
                // Logged in admin - Show Dashboard and Sign Out
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <Shield className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 text-xs font-medium">Admin</span>
                  </div>

                  <Link
                    href="/admin/dashboard"
                    className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2 border border-blue-500/30"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>

                  <button
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="group bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2 border border-red-500/30"
                  >
                    {signingOut ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing Out...</span>
                      </>
                    ) : (
                      <>
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                // Not logged in - Show Admin Login
                <Link
                  href="/admin/login"
                  className="group bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 hover:border-gray-500/50 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin Login</span>
                </Link>
              )}
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group bg-gray-900/50 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 border border-gray-700/50 hover:border-blue-500/30 text-gray-400 hover:text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <span className="text-sm font-medium">Back to Top</span>
              <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

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
    </footer>
  )
}

export default Footer

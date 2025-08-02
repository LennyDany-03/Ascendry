"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/navbar.jsx"
import Footer from "../components/footer.jsx"
import InteractiveBackground from "../components/interactive-background"
import { supabase } from "../lib/supabase/client.js"
import { projectsAPI } from "../lib/api.js"
import Link from "next/link"
import {
  Globe,
  Smartphone,
  Server,
  Palette,
  ShoppingCart,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Code,
  Zap,
  Star,
  CheckCircle,
  Award,
  TrendingUp,
  Rocket,
  Brain,
  Shield,
  Loader2,
} from "lucide-react"

const Page = () => {
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const api = projectsAPI(supabase)
        const projects = await api.getPublished()
        // Get only the first 3 projects for featured section
        setFeaturedProjects(projects.slice(0, 3))
      } catch (err) {
        console.error("Error fetching projects:", err)
        setError(err.message)
        // Fallback to hardcoded data if fetch fails
        setFeaturedProjects([
          {
            title: "NovaPay",
            description: "AI-powered UPI expense tracker with smart categorization and budget insights",
            tech_stack: ["React", "Supabase", "AI/ML", "Chart.js"],
            gradient: "from-blue-500 to-purple-500",
          },
          {
            title: "ClubSphere",
            description: "Comprehensive college club management system with event handling",
            tech_stack: ["Next.js", "Firebase", "Stripe", "Analytics"],
            gradient: "from-purple-500 to-pink-500",
          },
          {
            title: "Exodus Ministry",
            description: "Modern church website with donation integration and media gallery",
            tech_stack: ["React", "CMS", "Payment", "Media"],
            gradient: "from-green-500 to-blue-500",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const services = [
    {
      title: "Web Development",
      desc: "Modern, responsive websites built with cutting-edge technologies",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      title: "Mobile Apps",
      desc: "Native iOS and Android applications with seamless UX",
      icon: Smartphone,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
    },
    {
      title: "Backend Systems",
      desc: "Scalable server solutions and robust API development",
      icon: Server,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
    },
    {
      title: "UI/UX Design",
      desc: "Beautiful user experiences that convert and engage",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/30",
    },
    {
      title: "E-commerce",
      desc: "Complete online store solutions with payment integration",
      icon: ShoppingCart,
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
    },
    {
      title: "Consulting",
      desc: "Strategic technical guidance and architecture planning",
      icon: Lightbulb,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Interactive Background Component */}
      <br />
      <InteractiveBackground />

      <Navbar />

      {/* Hero Section - Enhanced */}
      <section id="home" className="min-h-screen flex items-center justify-center relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <br />
          <br />
          <br />
          <br />
          {/* Main Typography - Enhanced */}
          <div className="mb-12">
            <h1 className="font-black leading-none">
              {/* BUILD. */}
              <div className="relative mb-4">
                <span className="text-7xl md:text-8xl lg:text-8xl text-white drop-shadow-2xl">BUILD.</span>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl opacity-50 animate-pulse"></div>
              </div>

              {/* CODE. */}
              <div className="relative mb-4">
                <span className="text-7xl md:text-8xl lg:text-8xl text-gray-500 drop-shadow-xl">CODE.</span>
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl opacity-30 animate-pulse delay-1000"></div>
              </div>

              {/* ASCEND. */}
              <div className="relative">
                <span className="text-7xl md:text-8xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-2xl">
                  ASCEND.
                </span>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-2xl opacity-60 animate-pulse delay-2000"></div>
              </div>
            </h1>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              href="/hire"
              className="group relative bg-white hover:bg-gray-100 text-black px-10 py-4 font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <Rocket className="w-5 h-5" />
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Link>

            <Link
              href="/projects"
              className="group border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 font-bold text-lg transition-all duration-300 hover:scale-105 rounded-xl flex items-center space-x-2"
            >
              <Code className="w-5 h-5" />
              <span>View Projects</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "50+", label: "Projects Completed", icon: CheckCircle, color: "text-green-400" },
              { number: "100%", label: "Client Satisfaction", icon: Star, color: "text-yellow-400" },
              { number: "3+", label: "Years Experience", icon: Award, color: "text-purple-400" },
              { number: "24/7", label: "Support Available", icon: Shield, color: "text-blue-400" },
            ].map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:border-gray-600/50 transition-all duration-300">
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-black text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-gray-950/50 to-black relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-medium">What I Offer</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100">
              SERVICES
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions to bring your digital vision to life with cutting-edge technology and design
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div
                  key={index}
                  className={`group relative ${service.bgColor} backdrop-blur-xl border ${service.borderColor} rounded-3xl p-8 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden`}
                >
                  {/* Background Effects */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>
                  <div
                    className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                  ></div>

                  <div className="relative z-10">
                    {/* Enhanced Icon */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300 mb-6 leading-relaxed">
                      {service.desc}
                    </p>

                    {/* Enhanced CTA */}
                    <div className="flex items-center space-x-2 text-gray-500 group-hover:text-blue-400 transition-colors duration-300">
                      <span className="font-medium">Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Floating Particles */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300 delay-150"></div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-20 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
              <Code className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-medium">Featured Work</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-pink-100">
              PROJECTS
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Recent work and case studies showcasing real-world solutions and innovative approaches
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                <span className="text-gray-400">Loading projects...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-20">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 max-w-md mx-auto">
                <p className="text-red-400 mb-4">Failed to load projects</p>
                <p className="text-gray-400 text-sm">Showing fallback content</p>
              </div>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && featuredProjects.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id || index}
                  className="group bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 hover:border-purple-500/50 hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 rounded-3xl"
                >
                  {/* Enhanced Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.gradient || "from-blue-500 to-purple-500"} opacity-20 group-hover:opacity-30 transition-all duration-300`}
                    ></div>
                    <div className="absolute inset-0 bg-black/40"></div>

                    {/* Project Image */}
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = "none"
                          e.target.nextElementSibling.style.display = "flex"
                        }}
                      />
                    ) : null}

                    {/* Fallback */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center ${project.thumbnail ? "hidden" : ""}`}
                    >
                      <div className="text-6xl opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                        💻
                      </div>
                    </div>

                    <div className="absolute top-4 right-4">
                      <TrendingUp className="w-6 h-6 text-white opacity-60" />
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full opacity-80"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full opacity-60"></div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(project.tech_stack || project.techStack || []).slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-800/50 border border-gray-700/50 text-gray-300 text-xs rounded-full group-hover:border-gray-600/50 group-hover:text-white transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Enhanced CTA */}
                    <div className="flex items-center justify-between">
                      <Link
                        href={project.slug ? `/projects/${project.slug}` : "#"}
                        className="text-white hover:text-purple-400 font-semibold transition-colors duration-300 flex items-center space-x-2 group/btn"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
                        <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse delay-100"></div>
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Projects State */}
          {!loading && featuredProjects.length === 0 && !error && (
            <div className="text-center py-20">
              <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-8 max-w-md mx-auto">
                <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">No projects found</p>
                <p className="text-gray-500 text-sm">Check back later for updates</p>
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center space-x-2 border-2 border-purple-500 hover:bg-purple-500 hover:text-white text-purple-400 px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Quick Links */}
      <section className="py-20 bg-gray-950/50 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Explore More</h2>
            <p className="text-gray-400">Discover additional resources and ways to connect</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Store */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">STORE</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Premium digital products, templates, and source codes
              </p>
              <Link
                href="/store"
                className="inline-flex items-center space-x-2 text-blue-400 hover:text-white font-medium transition-colors duration-300"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Blog */}
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">BLOG</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">Tech insights, tutorials, and development stories</p>
              <Link
                href="/blog"
                className="inline-flex items-center space-x-2 text-green-400 hover:text-white font-medium transition-colors duration-300"
              >
                <span>Read Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/30 rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">CONTACT</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">Let's collaborate and build something amazing</p>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 text-pink-400 hover:text-white font-medium transition-colors duration-300"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA */}
      <section className="py-20 bg-black relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-gray-900/60 to-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Transform your ideas into powerful digital solutions. Let's create something extraordinary together and
                make your vision a reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/hire"
                  className="bg-white hover:bg-gray-200 text-black px-10 py-4 font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2"
                >
                  <Rocket className="w-5 h-5" />
                  <span>Hire Me</span>
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Get In Touch</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Page

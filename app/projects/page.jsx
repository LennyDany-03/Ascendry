"use client"

import Navbar from "../../components/navbar.jsx"
import Footer from "../../components/footer.jsx"
import InteractiveBackground from "../../components/interactive-background"
import ProjectCard from "../../components/project-card.jsx"
import Link from "next/link"
import {
  Briefcase,
  Code,
  Rocket,
  Target,
  Users,
  Globe,
  Smartphone,
  CreditCard,
  ArrowRight,
  Brain,
  Heart,
  Layers,
  ShoppingCart,
  Sparkles,
  Award,
  Filter,
  Search,
  MessageSquare,
} from "lucide-react"

const ProjectsPage = () => {
  const projects = [
    {
      id: "club-sphere",
      title: "Club Sphere",
      subtitle: "College Club Management System",
      description:
        "A comprehensive full-stack solution that revolutionizes how college clubs operate. Features include event management, payment processing, member portals, and real-time notifications.",
      longDescription:
        "Built to solve the complex challenges of managing multiple college clubs with thousands of students.",
      techStack: ["React", "Supabase", "Razorpay", "Tailwind CSS", "Node.js"],
      githubUrl: "#",
      liveUrl: "#",
      detailsUrl: "/projects/club-sphere",
      category: "Full-Stack",
      status: "Live",
      duration: "3 months",
      year: "2024",
      thumbnail: "/placeholder.svg?height=300&width=500",
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      icon: Users,
      features: [
        "Event Management",
        "Payment Integration",
        "Real-time Notifications",
        "Admin Dashboard",
        "Member Portal",
        "Analytics",
      ],
      metrics: { users: "500+", events: "100+", satisfaction: "98%" },
      complexity: "High",
      impact: "Streamlined club operations for 10+ colleges",
    },
    {
      id: "exodus-music-ministry",
      title: "Exodus Music Ministry",
      subtitle: "Church Community Platform",
      description:
        "A beautiful, modern website connecting church community through music. Features event listings, music streaming, member profiles, and integrated donation system.",
      longDescription: "Designed to strengthen community bonds and showcase musical talents in a digital-first world.",
      techStack: ["Next.js", "Firebase", "Stripe", "Framer Motion", "Vercel"],
      githubUrl: "#",
      liveUrl: "#",
      detailsUrl: "/projects/exodus-music-ministry",
      category: "Website",
      status: "Live",
      duration: "2 months",
      year: "2024",
      thumbnail: "/placeholder.svg?height=300&width=500",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      icon: Heart,
      features: [
        "Music Streaming",
        "Event Management",
        "Donation System",
        "Member Profiles",
        "Media Gallery",
        "Community Feed",
      ],
      metrics: { members: "200+", donations: "$5k+", engagement: "95%" },
      complexity: "Medium",
      impact: "Enhanced community engagement by 300%",
    },
    {
      id: "novapay",
      title: "NovaPay",
      subtitle: "AI-Powered Expense Tracker",
      description:
        "Revolutionary UPI budget tracker with AI-powered insights. Smart categorization, predictive analytics, bill reminders, and personalized financial goal tracking.",
      longDescription: "Transforming how people manage their finances with intelligent automation and insights.",
      techStack: ["React Native", "Firebase", "UPI API", "Chart.js", "Redux", "TensorFlow"],
      githubUrl: "#",
      liveUrl: "#",
      detailsUrl: "/projects/novapay",
      category: "Mobile App",
      status: "Live",
      duration: "4 months",
      year: "2024",
      thumbnail: "/placeholder.svg?height=300&width=500",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      icon: CreditCard,
      features: [
        "AI Insights",
        "Expense Tracking",
        "Bill Reminders",
        "Goal Setting",
        "UPI Integration",
        "Predictive Analytics",
      ],
      metrics: { transactions: "10k+", savings: "₹2L+", accuracy: "96%" },
      complexity: "High",
      impact: "Helped users save 40% more money",
    },
    {
      id: "hospital-chatbot",
      title: "Hospital ChatBot",
      subtitle: "Multilingual Health Assistant",
      description:
        "Advanced AI-powered health consultation chatbot supporting Tamil and English. Provides preliminary assessments, appointment booking, and medical information.",
      longDescription: "Breaking language barriers in healthcare with intelligent multilingual support.",
      techStack: ["Python", "TensorFlow", "Flask", "NLP", "MongoDB", "React"],
      githubUrl: "#",
      liveUrl: "#",
      detailsUrl: "/projects/hospital-chatbot",
      category: "AI/ML",
      status: "Live",
      duration: "5 months",
      year: "2024",
      thumbnail: "/placeholder.svg?height=300&width=500",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      icon: Brain,
      features: [
        "Multilingual Support",
        "Health Assessment",
        "Appointment Booking",
        "NLP Processing",
        "Medical Database",
        "Emergency Alerts",
      ],
      metrics: { consultations: "1k+", languages: "2", accuracy: "94%" },
      complexity: "Very High",
      impact: "Reduced wait times by 60%",
    },
    {
      id: "ecommerce-platform",
      title: "E-Commerce Platform",
      subtitle: "Modern Shopping Experience",
      description:
        "Scalable e-commerce solution with advanced filtering, secure payments, inventory management, and comprehensive analytics dashboard.",
      longDescription: "Built for performance and scalability to handle enterprise-level traffic and transactions.",
      techStack: ["Next.js", "Stripe", "PostgreSQL", "Redis", "AWS", "Docker"],
      githubUrl: "#",
      liveUrl: "#",
      detailsUrl: "/projects/ecommerce-platform",
      category: "E-commerce",
      status: "Live",
      duration: "6 months",
      year: "2023",
      thumbnail: "/placeholder.svg?height=300&width=500",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      icon: ShoppingCart,
      features: [
        "Payment Processing",
        "Inventory Management",
        "Analytics",
        "Product Filtering",
        "Order Tracking",
        "Multi-vendor",
      ],
      metrics: { orders: "5k+", revenue: "$50k+", uptime: "99.9%" },
      complexity: "Very High",
      impact: "Increased sales conversion by 250%",
    },
    {
      id: "task-management-app",
      title: "Task Management App",
      subtitle: "Team Productivity Suite",
      description:
        "Collaborative task management with real-time updates, team collaboration, project tracking, and productivity analytics for remote teams.",
      longDescription: "Designed to maximize team productivity and streamline project management workflows.",
      techStack: ["Vue.js", "Socket.io", "Express", "MongoDB", "JWT", "Redis"],
      githubUrl: "#",
      liveUrl: "#",
      detailsUrl: "/projects/task-management-app",
      category: "Productivity",
      status: "Live",
      duration: "3 months",
      year: "2023",
      thumbnail: "/placeholder.svg?height=300&width=500",
      gradient: "from-teal-500 via-green-500 to-emerald-500",
      icon: Target,
      features: [
        "Real-time Updates",
        "Team Collaboration",
        "Project Tracking",
        "Analytics",
        "Time Tracking",
        "Kanban Boards",
      ],
      metrics: { teams: "50+", tasks: "10k+", efficiency: "+45%" },
      complexity: "Medium",
      impact: "Improved team productivity by 45%",
    },
  ]

  const categories = [
    { name: "All", count: projects.length, icon: Layers, color: "from-gray-500 to-gray-600" },
    { name: "Full-Stack", count: 1, icon: Code, color: "from-blue-500 to-purple-500" },
    { name: "Mobile App", count: 1, icon: Smartphone, color: "from-green-500 to-emerald-500" },
    { name: "AI/ML", count: 1, icon: Brain, color: "from-cyan-500 to-blue-500" },
    { name: "E-commerce", count: 1, icon: ShoppingCart, color: "from-orange-500 to-red-500" },
    { name: "Website", count: 1, icon: Globe, color: "from-teal-500 to-green-500" },
    { name: "Productivity", count: 1, icon: Target, color: "from-purple-500 to-pink-500" },
  ]

  const stats = [
    {
      title: "Total Projects",
      value: "20+",
      icon: Briefcase,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      description: "Completed successfully",
    },
    {
      title: "Happy Clients",
      value: "15+",
      icon: Users,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      description: "Worldwide partnerships",
    },
    {
      title: "Technologies",
      value: "25+",
      icon: Code,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      description: "Modern tech stack",
    },
    {
      title: "Success Rate",
      value: "100%",
      icon: Award,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
      description: "Project delivery",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative">
      <InteractiveBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Content */}
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="mb-6">
              <div className="inline-flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-2xl">
                <div className="relative">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping opacity-20"></div>
                </div>
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 font-medium text-sm">Featured Portfolio</span>
                <div className="w-px h-4 bg-gray-600"></div>
                <span className="text-blue-400 font-bold text-sm">2024 Collection</span>
              </div>
            </div>

            {/* Title */}
            <div className="mb-6">
              <h1 className="font-black leading-none mb-4">
                <div className="relative">
                  <span className="text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100 drop-shadow-2xl">
                    PROJECTS
                  </span>
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-2xl opacity-60 animate-pulse"></div>
                </div>
              </h1>
              <div className="text-lg md:text-xl text-gray-400 font-medium">
                Where Innovation Meets{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Excellence
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-400 mb-8 max-w-4xl mx-auto leading-relaxed">
              Explore a curated collection of real-world solutions that showcase cutting-edge technology, innovative
              design, and measurable impact across diverse industries.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <button className="group relative bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-xl overflow-hidden">
                <span className="relative z-10 flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filter Projects</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>

              <button className="group border-2 border-white hover:bg-white hover:text-black text-white px-6 py-3 font-bold text-sm transition-all duration-300 hover:scale-105 rounded-xl flex items-center space-x-2">
                <Search className="w-4 h-4" />
                <span>Search Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div
                  key={index}
                  className={`group relative ${stat.bgColor} backdrop-blur-xl border ${stat.borderColor} rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden`}
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10 text-center">
                    <div className="w-12 h-12 bg-gray-900/50 border border-gray-700/50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="text-xl font-black text-white mb-1">{stat.value}</div>
                    <div className="text-sm font-bold text-white mb-1">{stat.title}</div>
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

      {/* Categories Filter */}
      <section className="py-12 bg-gradient-to-b from-gray-950/30 to-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-4">
              <Layers className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-medium text-sm">Project Categories</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100">
              EXPLORE BY TYPE
            </h2>
            <p className="text-gray-400 text-sm">Discover projects across different domains and technologies</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <button
                  key={index}
                  className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 hover:border-blue-500/50 rounded-xl px-4 py-3 transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  <div className="relative z-10 flex items-center space-x-2">
                    <div
                      className={`w-8 h-8 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-white font-bold text-sm group-hover:text-blue-400 transition-colors duration-300">
                        {category.name}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {category.count} {category.count === 1 ? "project" : "projects"}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-16 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-4">
              <Rocket className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-medium text-sm">Featured Work</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-pink-100">
              SHOWCASE
            </h2>
            <p className="text-base text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Each project represents a unique challenge solved with innovative technology and creative problem-solving
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-gray-950/50 to-black relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 lg:p-12 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            {/* Floating Elements */}
            <div className="absolute top-6 right-6 w-3 h-3 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-6 left-6 w-2 h-2 bg-purple-400 rounded-full opacity-30 animate-bounce"></div>

            <div className="relative z-10">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100">
                  Ready to Build Something Extraordinary?
                </h2>
                <p className="text-gray-400 mb-6 max-w-2xl mx-auto text-base leading-relaxed">
                  Let's collaborate to transform your vision into a powerful digital solution that drives real results
                  and creates lasting impact.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Link
                  href="/hire"
                  className="group relative bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Start Your Project</span>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-lg font-black text-blue-400">Free</div>
                  <div className="text-gray-400 text-sm">Initial Consultation</div>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-black text-purple-400">24h</div>
                  <div className="text-gray-400 text-sm">Response Time</div>
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-black text-pink-400">100%</div>
                  <div className="text-gray-400 text-sm">Satisfaction Guarantee</div>
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

export default ProjectsPage

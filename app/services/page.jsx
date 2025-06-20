"use client"

import Navbar from "../../components/navbar.jsx"
import Footer from "../../components/footer.jsx"
import InteractiveBackground from "../../components/interactive-background"
import Link from "next/link"
import {
  Globe,
  Smartphone,
  Server,
  Palette,
  ShoppingCart,
  Lightbulb,
  ArrowRight,
  Code,
  Zap,
  Star,
  CheckCircle,
  TrendingUp,
  Rocket,
  Shield,
  Target,
  Users,
  Layers,
  Database,
  SmartphoneIcon as Mobile,
  Monitor,
  CreditCard,
  BarChart3,
  Search,
  Cpu,
  Lock,
  Cloud,
  TypeIcon as Design,
  MessageSquare,
  Settings,
  BookOpen,
  Briefcase,
} from "lucide-react"

const ServicesPage = () => {
  const services = [
    {
      icon: Globe,
      title: "Web Development",
      description:
        "Modern, responsive websites built with cutting-edge technologies. From landing pages to complex web applications, I create digital experiences that engage and convert.",
      features: ["Responsive Design", "SEO Optimization", "Performance Focused", "Modern Frameworks"],
      technologies: ["React", "Next.js", "Vue.js", "Tailwind CSS"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      featureIcons: [Monitor, Search, Zap, Code],
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description:
        "Native and cross-platform mobile applications for iOS and Android. User-friendly interfaces with seamless performance and intuitive navigation.",
      features: ["Cross-Platform", "Native Performance", "App Store Ready", "Push Notifications"],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      featureIcons: [Layers, Cpu, Star, MessageSquare],
    },
    {
      icon: Server,
      title: "Backend Systems",
      description:
        "Scalable server solutions and APIs that power your applications. Robust architecture designed for growth, security, and optimal performance.",
      features: ["RESTful APIs", "Database Design", "Cloud Integration", "Security First"],
      technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      featureIcons: [Code, Database, Cloud, Lock],
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Beautiful user experiences that combine aesthetics with functionality. User-centered design approach that enhances engagement and usability.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      technologies: ["Figma", "Adobe XD", "Sketch", "Framer"],
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/30",
      featureIcons: [Users, Design, Target, Layers],
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description:
        "Complete online store solutions with secure payment processing, inventory management, and analytics. Built to drive sales and growth.",
      features: ["Payment Integration", "Inventory Management", "Analytics Dashboard", "Mobile Optimized"],
      technologies: ["Shopify", "WooCommerce", "Stripe", "PayPal"],
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      featureIcons: [CreditCard, BarChart3, TrendingUp, Mobile],
    },
    {
      icon: Lightbulb,
      title: "Consulting",
      description:
        "Technical guidance and mentorship to help you make informed decisions. Code reviews, architecture planning, and strategic technology advice.",
      features: ["Code Reviews", "Architecture Planning", "Technology Strategy", "Team Mentoring"],
      technologies: ["Best Practices", "Code Quality", "Performance", "Scalability"],
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
      featureIcons: [CheckCircle, Settings, BookOpen, Users],
    },
  ]

  const processSteps = [
    {
      step: "01",
      title: "Discovery",
      description: "Understanding your needs, goals, and target audience to create the perfect solution.",
      icon: Search,
      color: "from-blue-500 to-cyan-500",
    },
    {
      step: "02",
      title: "Planning",
      description: "Detailed project planning, timeline creation, and technology stack selection.",
      icon: Target,
      color: "from-purple-500 to-violet-500",
    },
    {
      step: "03",
      title: "Development",
      description: "Agile development process with regular updates and feedback incorporation.",
      icon: Code,
      color: "from-green-500 to-emerald-500",
    },
    {
      step: "04",
      title: "Delivery",
      description: "Testing, deployment, and ongoing support to ensure your project's success.",
      icon: Rocket,
      color: "from-pink-500 to-rose-500",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative">
      <InteractiveBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Welcome Badge */}
          <div className="mb-12">
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gray-900/60 backdrop-blur-xl rounded-full border border-gray-700/50 shadow-2xl">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <Briefcase className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300 font-medium">Professional Services</span>
            </div>
          </div>

          {/* Main Typography */}
          <div className="mb-12">
            <h1 className="font-black leading-tight">
              <div className="text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100 mb-4 drop-shadow-2xl">
                SERVICES
              </div>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            Comprehensive solutions for your digital needs — from concept to deployment and beyond.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "6+", label: "Service Areas", icon: Briefcase, color: "text-blue-400" },
              { number: "50+", label: "Projects Delivered", icon: CheckCircle, color: "text-green-400" },
              { number: "100%", label: "Client Satisfaction", icon: Star, color: "text-yellow-400" },
              { number: "24/7", label: "Support Available", icon: Shield, color: "text-purple-400" },
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

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-950/50 to-black relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-medium">What I Offer</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100">
              MY EXPERTISE
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              End-to-end solutions tailored to your specific needs and business goals
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
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">Key Features</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {service.features.map((feature, idx) => {
                          const FeatureIcon = service.featureIcons[idx]
                          return (
                            <div key={idx} className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-gray-800/50 border border-gray-700/50 rounded-lg flex items-center justify-center group-hover:bg-gray-700/50 group-hover:border-gray-600/50 transition-all duration-300">
                                <FeatureIcon className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors duration-300" />
                              </div>
                              <span className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors duration-300">
                                {feature}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-800/50 border border-gray-700/50 text-gray-300 text-xs rounded-full group-hover:border-gray-600/50 group-hover:text-white transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

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

      {/* Process Section */}
      <section className="py-20 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
              <Settings className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-medium">My Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-pink-100">
              HOW I WORK
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              A proven methodology that ensures successful project delivery from start to finish
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className="text-center group">
                  <div className="relative mb-8">
                    {/* Step Number */}
                    <div className="w-20 h-20 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:border-gray-600/50 transition-all duration-300 relative overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                      ></div>
                      <span className="text-2xl font-black text-white relative z-10">{step.step}</span>
                    </div>

                    {/* Icon */}
                    <div
                      className={`absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>

                    {/* Connection Line */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-gray-700 to-transparent -translate-x-10"></div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-950/50 to-black relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-gray-900/60 to-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100">
                Don't See What You're Looking For?
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Let's build it together! I love taking on unique challenges and creating custom solutions tailored to
                your specific needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/contact"
                  className="group relative bg-white hover:bg-gray-100 text-black px-10 py-4 font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Let's Discuss</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Link>

                <Link
                  href="/projects"
                  className="border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 font-bold text-lg transition-all duration-300 hover:scale-105 rounded-xl flex items-center space-x-2"
                >
                  <Briefcase className="w-5 h-5" />
                  <span>View My Work</span>
                  <ArrowRight className="w-5 h-5" />
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

export default ServicesPage

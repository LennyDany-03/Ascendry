"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  LayoutTemplate,
  Briefcase,
  Zap,
  DollarSign,
  Settings,
  CheckCircle,
  Star,
  Users,
  BarChart2,
  CreditCard,
  Palette,
  Smartphone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useCallback, useEffect, useState } from "react"
import Navbar from "@/components/navbar" // Import the Navbar component
import Footer from "@/components/footer" // Import the Footer component

// --- Data Definitions ---

const featuredProducts = [
  {
    id: 1,
    headline: "Your Campus, Your Community",
    subheadline: "ClubSphere: Bridging Passion, Opportunity, and Connection.",
    image: "/anime-night-sky-illustration.jpg",
    buttonText: "Explore Clubs",
    link: "#clubs",
  },
  {
    id: 2,
    headline: "Discover Events, Connect Instantly.",
    subheadline: "Never miss out on campus happenings and social gatherings.",
    image: "/anime-style-portrait-traditional-japanese-samurai-character.jpg",
    buttonText: "Find Events",
    link: "#events",
  },
  {
    id: 3,
    headline: "Empower Your Student Life.",
    subheadline: "Tools and resources to enhance your academic and social journey.",
    image: "/samurai-warrior-night-by-lake.jpg",
    buttonText: "Learn More",
    link: "#about",
  },
]

const productCards = [
  {
    id: 1,
    name: "AI Dev Suite",
    tagline: "Intelligent coding assistance.",
    thumbnail: "/samurai-warrior-night-by-lake.jpg",
    link: "/products/ai-dev-suite",
    icon: Zap,
    gradient: "from-teal-500 to-aqua-600",
  },
  {
    id: 2,
    name: "Website Builder",
    tagline: "Stunning sites, no code.",
    thumbnail: "/anime-night-sky-illustration.jpg",
    link: "/products/website-builder",
    icon: LayoutTemplate,
    gradient: "from-orange-500 to-amber-600",
  },
  {
    id: 3,
    name: "Business OS",
    tagline: "Manage your entire enterprise.",
    thumbnail: "/anime-style-portrait-traditional-japanese-samurai-character.jpg",
    link: "/products/business-os",
    icon: Briefcase,
    gradient: "from-emerald-500 to-lime-600",
  },
]

const roadmapFeatures = [
  {
    id: 1,
    name: "AI Code Refactoring",
    description: "Automated code optimization and refactoring suggestions powered by AI.",
    status: "In Progress",
    icon: Zap,
    eta: "Q4 2024",
    gradient: "from-teal-500 to-aqua-600",
  },
  {
    id: 2,
    name: "Collaborative Workspace",
    description: "Real-time multi-user editing and project collaboration features.",
    status: "Coming Soon",
    icon: Users,
    eta: "Q1 2025",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    id: 3,
    name: "Advanced Analytics Dashboard",
    description: "Deeper insights into project performance and user engagement.",
    status: "Planned",
    icon: BarChart2,
    eta: "Q2 2025",
    gradient: "from-purple-500 to-fuchsia-600",
  },
  {
    id: 4,
    name: "Integrated Payment Gateway",
    description: "Seamless integration with popular payment providers for e-commerce.",
    status: "In Progress",
    icon: CreditCard,
    eta: "Q4 2024",
    gradient: "from-emerald-500 to-lime-600",
  },
  {
    id: 5,
    name: "Customizable UI Kits",
    description: "Expandable library of UI components and themes for rapid development.",
    status: "Coming Soon",
    icon: Palette,
    eta: "Q1 2025",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    id: 6,
    name: "Mobile App Deployment",
    description: "Direct deployment of web apps as native mobile applications.",
    status: "Planned",
    icon: Smartphone,
    eta: "Q3 2025",
    gradient: "from-cyan-500 to-blue-600",
  },
]

const whyChooseUs = [
  {
    icon: CheckCircle,
    title: "All-in-One Platform",
    description: "Everything you need to build, deploy, and manage your digital presence.",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    description: "Premium tools and templates without the hefty price tag.",
  },
  {
    icon: Settings,
    title: "Easy Setup & Use",
    description: "Intuitive interfaces and guided workflows mean no coding needed.",
  },
  {
    icon: Star,
    title: "Trusted by Thousands",
    description: "Join a growing community of businesses and creators succeeding with us.",
  },
]

// --- Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// --- Main Component ---

export default function HomePage() {
  // Removed heroEmblaRef, heroEmblaApi, onHeroSelect, and its useEffect
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0) // Manually manage hero index

  const [roadmapEmblaRef, roadmapEmblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })])
  const [roadmapSelectedIndex, setRoadmapSelectedIndex] = useState(0)

  // Effect for hero section fade animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length)
    }, 5000) // Change slide every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const onRoadmapSelect = useCallback(() => {
    if (!roadmapEmblaApi) return
    setRoadmapSelectedIndex(roadmapEmblaApi.selectedScrollSnap())
  }, [roadmapEmblaApi, setRoadmapSelectedIndex])

  useEffect(() => {
    if (!roadmapEmblaApi) return
    onRoadmapSelect()
    roadmapEmblaApi.on("select", onRoadmapSelect)
    roadmapEmblaApi.on("reInit", onRoadmapSelect)
  }, [roadmapEmblaApi, onRoadmapSelect])

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden relative">
      <Navbar /> {/* Added Navbar component */}
      {/* Background Gradients & Shapes */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-teal-500 to-transparent rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-br from-orange-500 to-transparent rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500 to-transparent rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>
      {/* Hero Banner (Featured Product Fade) */}
      <section className="relative z-10 py-0 px-0 bg-gradient-to-br from-slate-950 to-black overflow-hidden min-h-screen pt-[72px]">
        {" "}
        {/* Added pt-[72px] for navbar clearance */}
        {featuredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentHeroIndex ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${product.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              key={product.id + "-content"} // Key change for re-animation of content on slide change
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="relative z-10 max-w-4xl mx-auto h-full flex flex-col items-center justify-center text-center p-4"
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight text-white"
              >
                {product.headline.split(".").map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="bg-gradient-to-r from-teal-400 via-aqua-400 to-lime-400 bg-clip-text text-transparent">
                        .
                      </span>
                    )}
                  </span>
                ))}
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                {product.subheadline}
              </motion.p>
              <motion.div variants={itemVariants}>
                <div className="relative inline-block group">
                  <div className="absolute inset-[-2px] rounded-full bg-gradient-to-r from-teal-400 via-emerald-400 to-lime-400 opacity-70 blur-md transition-opacity group-hover:opacity-100" />
                  <Button
                    size="lg"
                    aria-label="Explore feature"
                    className="relative rounded-full px-10 py-5 text-lg font-semibold text-white bg-gradient-to-b from-slate-900/80 to-slate-900/50 border border-teal-500/30 hover:border-teal-400/60 backdrop-blur-md shadow-[0_10px_30px_rgba(20,184,166,0.35)] hover:shadow-[0_12px_40px_rgba(34,197,94,0.45)] transition-all duration-300 overflow-hidden"
                  >
                    {/* Subtle inner texture */}
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.12),transparent_45%)]" />
                    {/* Content */}
                    <span className="relative z-10 flex items-center">
                      {product.buttonText}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                    {/* Animated shine */}
                    <span className="pointer-events-none absolute left-[-30%] top-0 h-full w-[35%] -skew-x-12 bg-white/10 blur-md opacity-0 translate-x-0 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-[220%]" />
                    {/* Soft inner ring */}
                    <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-teal-400/40" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentHeroIndex ? "bg-teal-400" : "bg-slate-600 hover:bg-slate-400"
              }`}
              onClick={() => setCurrentHeroIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        {/* Removed navigation arrows for hero section */}
      </section>
      {/* Product Cards Grid */}
      <section className="relative z-10 py-20 px-4 bg-slate-950">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
              Explore Our{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                Diverse Products
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-slate-400 max-w-3xl mx-auto">
              Find the perfect solution to accelerate your workflow and achieve your goals.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {productCards.map((product) => {
              const IconComponent = product.icon
              return (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className="h-full relative group"
                >
                  <div className="relative h-full rounded-xl overflow-hidden border border-slate-700 bg-slate-900/70 backdrop-blur-sm shadow-xl shadow-black/20 transition-all duration-300 group-hover:border-teal-500/50">
                    {/* Background image with blur and overlay */}
                    <div
                      className="absolute inset-0 z-0"
                      style={{
                        backgroundImage: `url(${product.thumbnail})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" /> {/* Darker overlay */}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      <div
                        className={`h-48 flex items-center justify-center rounded-t-xl ${product.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}
                      >
                        <IconComponent className="h-16 w-16 text-white opacity-90 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                        <p className="text-slate-400 mb-4 flex-grow">{product.tagline}</p>
                        <Button
                          variant="outline"
                          className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white bg-slate-900/50 backdrop-blur-sm group-hover:border-teal-500 group-hover:text-teal-300"
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
      {/* Roadmap & Upcoming Features Section */}
      <section className="relative z-10 py-20 px-4 bg-slate-950">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
              Roadmap &{" "}
              <span className="bg-gradient-to-r from-teal-400 to-lime-400 bg-clip-text text-transparent">
                Upcoming Features
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-slate-400 max-w-3xl mx-auto">
              See what we're building next to empower your journey.
            </motion.p>
          </motion.div>

          <div className="embla relative overflow-hidden" ref={roadmapEmblaRef}>
            {" "}
            {/* Added overflow-hidden */}
            <div className="embla__container flex -ml-4">
              {roadmapFeatures.map((feature) => {
                const IconComponent = feature.icon
                let statusColorClass = ""
                let statusBorderClass = ""
                switch (feature.status) {
                  case "In Progress":
                    statusColorClass = "bg-blue-500/20 text-blue-300 border-blue-500/30"
                    statusBorderClass = "group-hover:border-blue-500/50"
                    break
                  case "Coming Soon":
                    statusColorClass = "bg-orange-500/20 text-orange-300 border-orange-500/30"
                    statusBorderClass = "group-hover:border-orange-500/50"
                    break
                  case "Planned":
                    statusColorClass = "bg-purple-500/20 text-purple-300 border-purple-500/30"
                    statusBorderClass = "group-hover:border-purple-500/50"
                    break
                  default:
                    statusColorClass = "bg-slate-500/20 text-slate-300 border-slate-500/30"
                    statusBorderClass = "group-hover:border-slate-500/50"
                }

                return (
                  <div key={feature.id} className="embla__slide flex-none min-w-0 pl-4 w-full sm:w-1/2 lg:w-1/3">
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={itemVariants}
                      className="h-full"
                      whileHover={{
                        scale: 1.03,
                        y: -8,
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
                        transition: { duration: 0.3, ease: "easeOut" },
                      }}
                    >
                      <div
                        className={`bg-slate-900 border border-slate-800 rounded-2xl p-7 h-full flex flex-col justify-between shadow-2xl shadow-black/40 transition-all duration-300 ${statusBorderClass} group-hover:shadow-lg`}
                      >
                        <div className="flex flex-col items-center text-center mb-4">
                          <div
                            className={`w-24 h-24 rounded-full ${feature.gradient} flex items-center justify-center mb-4 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl`}
                          >
                            <IconComponent className="h-12 w-12 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">{feature.name}</h3>
                          <Badge className={`px-4 py-1.5 text-sm font-semibold rounded-full ${statusColorClass}`}>
                            {feature.status}
                          </Badge>
                        </div>
                        <p className="text-slate-300 text-base mb-4 flex-grow leading-relaxed">{feature.description}</p>
                        <div className="mt-auto text-right">
                          <span className="text-sm text-slate-400 font-medium">ETA: {feature.eta}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )
              })}
            </div>
            {/* Roadmap Carousel Navigation */}
            <button
              className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 transition-colors hidden"
              onClick={() => roadmapEmblaApi?.scrollPrev()}
              aria-label="Previous roadmap feature"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 transition-colors hidden"
              onClick={() => roadmapEmblaApi?.scrollNext()}
              aria-label="Next roadmap feature"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            {/* Roadmap Carousel Dots */}
            <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 flex space-x-2 z-20">
              {roadmapFeatures.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === roadmapSelectedIndex ? "bg-teal-400" : "bg-slate-600 hover:bg-slate-400"
                  }`}
                  onClick={() => roadmapEmblaApi?.scrollTo(index)}
                  aria-label={`Go to roadmap feature ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section className="relative z-10 py-20 px-4 bg-gradient-to-br from-slate-950 to-black">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-teal-400 to-lime-400 bg-clip-text text-transparent">
                AscendryCode?
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-slate-400 max-w-3xl mx-auto">
              We provide the ultimate platform for creators and businesses to thrive online.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {whyChooseUs.map((point, index) => {
              const IconComponent = point.icon
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="bg-slate-900/70 border border-slate-700 hover:bg-slate-800/70 hover:border-slate-600 transition-all duration-300 h-full backdrop-blur-sm group text-center p-6 shadow-xl shadow-black/20">
                    <CardHeader className="pb-4 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-aqua-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl text-white">{point.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-400 text-base leading-relaxed">
                        {point.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
      {/* Final Call-to-Action */}
      <section className="relative z-10 py-20 px-4 bg-gradient-to-br from-black to-slate-950">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center bg-gradient-to-r from-teal-600/10 via-orange-600/10 to-purple-600/10 rounded-3xl p-12 border border-teal-500/20 backdrop-blur-sm shadow-2xl shadow-teal-500/10"
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
              Join thousands using our{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                platform today.
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Unlock powerful tools, stunning templates, and unparalleled support to bring your ideas to life.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    aria-label="Explore feature"
                    className="relative rounded-full px-10 py-5 text-lg font-semibold text-white bg-gradient-to-b from-slate-900/80 to-slate-900/50 border border-teal-500/30 hover:border-teal-400/60 backdrop-blur-md shadow-[0_10px_30px_rgba(20,184,166,0.35)] hover:shadow-[0_12px_40px_rgba(34,197,94,0.45)] transition-all duration-300 overflow-hidden"
                  >
                    {/* Subtle inner texture */}
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.12),transparent_45%)]" />
                    {/* Content */}
                    <span className="relative z-10 flex items-center">
                      Browse All Product
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                    {/* Animated shine */}
                    <span className="pointer-events-none absolute left-[-30%] top-0 h-full w-[35%] -skew-x-12 bg-white/10 blur-md opacity-0 translate-x-0 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-[220%]" />
                    {/* Soft inner ring */}
                    <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-teal-400/40" />
                  </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer /> {/* Added Footer component */}
    </div>
  )
}

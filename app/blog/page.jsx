"use client"

import { useState, useEffect } from "react"
import Navbar from "../../components/navbar.jsx"
import Footer from "../../components/footer.jsx"
import InteractiveBackground from "../../components/interactive-background"
import { Code, Rocket, Zap, BookOpen, Coffee, Lightbulb, Clock, Github, Twitter } from "lucide-react"

const BlogPage = () => {
  const [progress, setProgress] = useState(0)
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    "Interactive Code Examples",
    "Real-time Tutorials",
    "Project Case Studies",
    "Tech Deep Dives",
    "Developer Stories",
  ]

  useEffect(() => {
    // Simulate progress loading
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) {
          clearInterval(progressInterval)
          return 85
        }
        return prev + Math.random() * 3
      })
    }, 200)

    // Cycle through features
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 2000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(featureInterval)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <InteractiveBackground />
      <Navbar />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Code Blocks */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10 text-blue-400 font-mono text-xs animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            {
              ["const blog = () => {}", "function render()", "import React", "export default", "// Coming Soon"][
                Math.floor(Math.random() * 5)
              ]
            }
          </div>
        ))}

        {/* Floating Geometric Shapes */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-pulse ${
              i % 3 === 0
                ? "w-2 h-2 bg-blue-500/20 rounded-full"
                : i % 3 === 1
                  ? "w-3 h-3 border border-purple-500/20 rotate-45"
                  : "w-2 h-2 bg-gradient-to-r from-pink-500/20 to-blue-500/20"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <section className="pt-32 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Status Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-orange-500/20 rounded-full group hover:border-orange-500/40 transition-all duration-300">
              <div className="relative">
                <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 font-bold text-sm">
                UNDER DEVELOPMENT
              </span>
            </div>
          </div>

          {/* Main Heading with Animation */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white animate-pulse">
                BLOG
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
                COMING SOON
              </span>
            </h1>

            {/* Animated Underline */}
            <div className="relative mx-auto w-64 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            We're crafting something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold">
              extraordinary
            </span>{" "}
            for you.
            <br />
            <span className="text-lg text-gray-400 mt-2 block">
              A space where code meets creativity, tutorials meet innovation, and developers find inspiration.
            </span>
          </p>

          {/* Progress Section */}
          <div className="mb-16 max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-300 font-semibold">Development Progress</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold">
                    {Math.round(progress)}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-800 rounded-full h-3 mb-6 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>
                </div>

                {/* Current Feature */}
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-2">Currently Working On:</p>
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold text-lg">
                    {features[currentFeature]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Preview Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
            {[
              {
                icon: Code,
                title: "Interactive Tutorials",
                description: "Step-by-step coding guides with live examples",
                color: "from-blue-500 to-cyan-500",
                delay: "0s",
              },
              {
                icon: Rocket,
                title: "Project Showcases",
                description: "Deep dives into real-world development projects",
                color: "from-purple-500 to-pink-500",
                delay: "0.2s",
              },
              {
                icon: Lightbulb,
                title: "Tech Insights",
                description: "Latest trends and breakthrough technologies",
                color: "from-orange-500 to-red-500",
                delay: "0.4s",
              },
              {
                icon: Coffee,
                title: "Developer Stories",
                description: "Behind-the-scenes of building amazing products",
                color: "from-green-500 to-teal-500",
                delay: "0.6s",
              },
              {
                icon: Zap,
                title: "Quick Tips",
                description: "Productivity hacks and development shortcuts",
                color: "from-yellow-500 to-orange-500",
                delay: "0.8s",
              },
              {
                icon: BookOpen,
                title: "Learning Paths",
                description: "Structured guides for mastering new skills",
                color: "from-indigo-500 to-purple-500",
                delay: "1s",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-500 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: feature.delay }}
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-3 mb-4 group-hover:rotate-12 transition-transform duration-300`}
                >
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="mb-16 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 relative overflow-hidden">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6 text-center">
                Development Timeline
              </h3>

              <div className="space-y-4">
                {[
                  { phase: "Phase 1", task: "Content Management System", status: "completed", date: "Dec 2024" },
                  { phase: "Phase 2", task: "Interactive Code Editor", status: "in-progress", date: "Jan 2025" },
                  { phase: "Phase 3", task: "Comment System & Community", status: "upcoming", date: "Feb 2025" },
                  { phase: "Phase 4", task: "Advanced Search & Filtering", status: "upcoming", date: "Mar 2025" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800/30 border border-gray-700/30"
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        item.status === "completed"
                          ? "bg-green-500"
                          : item.status === "in-progress"
                            ? "bg-blue-500 animate-pulse"
                            : "bg-gray-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{item.phase}</span>
                        <span className="text-xs text-gray-400">{item.date}</span>
                      </div>
                      <p className="text-sm text-gray-300">{item.task}</p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "completed"
                          ? "bg-green-500/20 text-green-400"
                          : item.status === "in-progress"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {item.status.replace("-", " ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Want to be{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    notified
                  </span>{" "}
                  when we launch?
                </h3>

                <p className="text-gray-400 mb-6">
                  Join our community and be the first to access exclusive content, tutorials, and insights.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com"
                      className="group/btn flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 text-white font-semibold rounded-xl hover:border-gray-500 transition-all duration-300 hover:scale-105"
                    >
                      <Github className="w-5 h-5" />
                      <span>Follow on GitHub</span>
                    </a>

                    <a
                      href="https://twitter.com"
                      className="group/btn flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      <Twitter className="w-5 h-5" />
                      <span>Follow Updates</span>
                    </a>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>Expected launch: Q1 2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fun Animation Section */}
          <div className="mt-16 relative">
            <div className="flex justify-center items-center space-x-4 text-6xl">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="animate-bounce text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: "2s",
                  }}
                >
                  {["🚀", "💻", "✨", "🎯", "🔥"][i]}
                </div>
              ))}
            </div>
            <p className="text-center text-gray-400 mt-4 text-sm">Something amazing is cooking...</p>
          </div>
        </div>
      </section>

      <Footer />

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

export default BlogPage

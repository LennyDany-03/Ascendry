"use client"

import Navbar from "../../components/navbar.jsx"
import Footer from "../../components/footer.jsx"
import InteractiveBackground from "../../components/interactive-background"
import Link from "next/link"

const ServicesPage = () => {
  const services = [
    {
      icon: "🌐",
      title: "Web Development",
      description:
        "Modern, responsive websites built with cutting-edge technologies. From landing pages to complex web applications, I create digital experiences that engage and convert.",
      features: ["Responsive Design", "SEO Optimization", "Performance Focused", "Modern Frameworks"],
      technologies: ["React", "Next.js", "Vue.js", "Tailwind CSS"],
    },
    {
      icon: "📱",
      title: "Mobile Apps",
      description:
        "Native and cross-platform mobile applications for iOS and Android. User-friendly interfaces with seamless performance and intuitive navigation.",
      features: ["Cross-Platform", "Native Performance", "App Store Ready", "Push Notifications"],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
    },
    {
      icon: "⚙️",
      title: "Backend Systems",
      description:
        "Scalable server solutions and APIs that power your applications. Robust architecture designed for growth, security, and optimal performance.",
      features: ["RESTful APIs", "Database Design", "Cloud Integration", "Security First"],
      technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description:
        "Beautiful user experiences that combine aesthetics with functionality. User-centered design approach that enhances engagement and usability.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      technologies: ["Figma", "Adobe XD", "Sketch", "Framer"],
    },
    {
      icon: "🛒",
      title: "E-commerce",
      description:
        "Complete online store solutions with secure payment processing, inventory management, and analytics. Built to drive sales and growth.",
      features: ["Payment Integration", "Inventory Management", "Analytics Dashboard", "Mobile Optimized"],
      technologies: ["Shopify", "WooCommerce", "Stripe", "PayPal"],
    },
    {
      icon: "💡",
      title: "Consulting",
      description:
        "Technical guidance and mentorship to help you make informed decisions. Code reviews, architecture planning, and strategic technology advice.",
      features: ["Code Reviews", "Architecture Planning", "Technology Strategy", "Team Mentoring"],
      technologies: ["Best Practices", "Code Quality", "Performance", "Scalability"],
    },
  ]

  const processSteps = [
    {
      step: "01",
      title: "Discovery",
      description: "Understanding your needs, goals, and target audience to create the perfect solution.",
    },
    {
      step: "02",
      title: "Planning",
      description: "Detailed project planning, timeline creation, and technology stack selection.",
    },
    {
      step: "03",
      title: "Development",
      description: "Agile development process with regular updates and feedback incorporation.",
    },
    {
      step: "04",
      title: "Delivery",
      description: "Testing, deployment, and ongoing support to ensure your project's success.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative">
      <InteractiveBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        {/* Geometric Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-white/10 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/5 rotate-12 animate-pulse"></div>
        <div className="absolute bottom-10 left-1/4 w-12 h-12 border border-blue-900/40 rounded-full animate-bounce"></div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 rounded-full border border-gray-800 mb-8">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300 font-medium">Professional Services</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 relative">
            <span className="text-white">SERVICES</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            What I can help you with - comprehensive solutions for your digital needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-950 relative">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(255,255,255,0.02)_50%,transparent_51%)] bg-[size:20px_20px]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-black p-8 border border-gray-800 hover:border-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white via-blue-500 to-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300 mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">Key Features</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-400 text-sm flex items-center space-x-2">
                        <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-900 border border-gray-700 text-gray-300 text-xs rounded group-hover:border-gray-600 group-hover:text-white transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-black relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 text-white">MY PROCESS</h2>
            <p className="text-xl text-gray-400">How I bring your ideas to life</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gray-950 border-2 border-gray-800 rounded-full flex items-center justify-center mx-auto group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-all duration-300">
                    <span className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors duration-300">
                      {step.step}
                    </span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gray-800 -translate-x-10"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-950 relative">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="bg-black border border-gray-800 rounded-2xl p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,64,175,0.1),transparent_70%)]"></div>

            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-6 text-white">Don't See What You're Looking For?</h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Let's build it together! I love taking on unique challenges and creating custom solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="#contact"
                  className="group bg-white hover:bg-gray-200 text-black px-10 py-4 font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                >
                  <span className="relative z-10">Let's Discuss</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Link>

                <Link
                  href="/projects"
                  className="border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 font-bold text-lg transition-all duration-300 hover:scale-105"
                >
                  View My Work
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

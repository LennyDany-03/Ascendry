"use client"

import { useState, useEffect, useRef } from "react"
import Navbar from "../../components/navbar.jsx"
import Footer from "../../components/footer.jsx"
import InteractiveBackground from "../../components/interactive-background"
import Link from "next/link"
import Image from "next/image.js"

import Lenny from "../../assets/Lenny.png"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState("")
  const [isVisible, setIsVisible] = useState({})
  const formRef = useRef(null)

  // Simple intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }))
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus("success")
      setFormData({ name: "", email: "", reason: "", message: "" })
      setTimeout(() => setSubmitStatus(""), 4000)
    }, 2000)
  }

  const contactMethods = [
    {
      icon: "📧",
      label: "Email",
      value: "lenny@ascendry.in",
      href: "mailto:lenny@ascendry.in",
      description: "Drop me a line anytime",
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "linkedin.com/in/lennydany",
      href: "https://linkedin.com/in/lennydany",
      description: "Let's connect professionally",
    },
    {
      icon: "📁",
      label: "GitHub",
      value: "github.com/LennyDany-03",
      href: "https://github.com/LennyDany-03",
      description: "Check out my code",
    },
    {
      icon: "🌐",
      label: "Website",
      value: "ascendry.in",
      href: "https://ascendry.in",
      description: "Explore my digital world",
    },
    {
      icon: "📍",
      label: "Location",
      value: "Chennai, India",
      href: "#",
      description: "Available worldwide remotely",
    },
    {
      icon: "⏰",
      label: "Response Time",
      value: "Within 24 hours",
      href: "#",
      description: "Quick and reliable communication",
    },
  ]

  const faqs = [
    {
      question: "What type of projects do you work on?",
      answer:
        "I specialize in full-stack web applications, mobile apps, AI/ML projects, and custom software solutions. From startups to enterprise-level applications.",
    },
    {
      question: "How do you handle project timelines?",
      answer:
        "I provide realistic timelines based on project scope and maintain regular communication throughout. Most projects are delivered on time with regular updates.",
    },
    {
      question: "Do you offer ongoing support?",
      answer:
        "Yes! I provide post-launch support, maintenance, and feature updates. I believe in long-term partnerships with my clients.",
    },
    {
      question: "What's your development process?",
      answer:
        "I follow an agile approach: Discovery → Planning → Development → Testing → Deployment → Support. You'll be involved at every step.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative">
      <InteractiveBackground />
      <Navbar />

      {/* Hero Section - Focused Animation */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          {/* Status Badge - Simple pulse animation */}
          <div className="mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gray-900/80 backdrop-blur-sm rounded-full border border-gray-700">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300 font-medium">Available for Projects</span>
            </div>
          </div>

          {/* Main Title - Staggered fade-in */}
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <span className="text-white">Let's Build</span>
            </div>
            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Something Amazing
              </span>
            </div>
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            Whether you're a startup, individual, or investor — if you're passionate about innovation and building with
            purpose, I'd love to connect.
          </p>

          {/* CTA Buttons - Simple hover effects */}
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center opacity-0 animate-fade-in-up"
            style={{ animationDelay: "1s" }}
          >
            <button
              onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-10 py-4 font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-xl"
            >
              <span className="flex items-center space-x-2">
                <span>Start a Conversation</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </button>

            <button
              onClick={() => document.getElementById("contact-info")?.scrollIntoView({ behavior: "smooth" })}
              className="border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 font-bold text-lg transition-all duration-300 hover:scale-105 rounded-xl"
            >
              Contact Info
            </button>
          </div>
        </div>
      </section>

      {/* About Section - Simple slide-in animation */}
      <section
        id="about"
        data-animate
        className={`py-20 bg-gray-950 relative transition-all duration-1000 ${
          isVisible.about ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-black text-white mb-4">Lenny Dany D</h2>
                <p className="text-2xl text-blue-400 font-semibold mb-2">CEO & Founder of Ascendry</p>
                <p className="text-lg text-gray-400">Turning Ideas into Digital Reality</p>
              </div>

              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p className="flex items-start space-x-3">
                  <span className="text-2xl">🚀</span>
                  <span>
                    Passionate about building AI, full-stack tools, and digital platforms that solve real-world
                    problems.
                  </span>
                </p>
                <p className="flex items-start space-x-3">
                  <span className="text-2xl">💡</span>
                  <span>
                    I lead Ascendry with a mission to empower developers, creatives, and businesses with modern,
                    scalable tech.
                  </span>
                </p>
                <p className="flex items-start space-x-3">
                  <span className="text-2xl">📫</span>
                  <span>
                    Whether it's a business inquiry, freelance request, collaboration idea, or just a friendly hello —
                    I'm listening.
                  </span>
                </p>
              </div>

              {/* Stats - Simple hover animation */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {[
                  { number: "50+", label: "Projects" },
                  { number: "100%", label: "Satisfaction" },
                  { number: "3+", label: "Years Exp" },
                  { number: "24/7", label: "Support" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500 hover:scale-105 transition-all duration-300 cursor-default"
                  >
                    <div className="text-2xl font-black text-blue-500 mb-2">{stat.number}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Photo - Simple hover effect */}
            <div className="relative">
              <div className="group relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-lg"></div>
                <div className="relative bg-gray-900 rounded-3xl p-3 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={Lenny}
                    alt="Lenny Dany D - CEO of Ascendry"
                    width={500}
                    height={500}
                    className="w-full h-[500px] object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form - Focused on form interactions */}
      <section
        ref={formRef}
        id="contact-form"
        data-animate
        className={`py-20 bg-black relative transition-all duration-1000 ${
          isVisible["contact-form"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">Send Me a Message</h2>
            <p className="text-xl text-gray-400">Let's discuss your next big idea</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 md:p-12 space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Name Field - Focus animation */}
              <div className="group">
                <label className="block text-gray-300 font-medium mb-3">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="Your full name"
                />
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="block text-gray-300 font-medium mb-3">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Reason Field */}
            <div className="group">
              <label className="block text-gray-300 font-medium mb-3">Reason for Contact</label>
              <select
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              >
                <option value="">Select a reason</option>
                <option value="work">Work Opportunity</option>
                <option value="collab">Collaboration</option>
                <option value="feedback">Feedback</option>
                <option value="investment">Investment</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Message Field */}
            <div className="group">
              <label className="block text-gray-300 font-medium mb-3">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                placeholder="Tell me about your project, idea, or just say hello..."
              ></textarea>
            </div>

            {/* Submit Button - Loading animation */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSubmitting ? "animate-pulse" : ""
                }`}
              >
                <span className="flex items-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Success Message - Fade in animation */}
            {submitStatus === "success" && (
              <div className="text-center p-6 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 animate-fade-in">
                <div className="text-4xl mb-2">✅</div>
                <div className="text-lg font-bold mb-1">Message sent successfully!</div>
                <div>I'll get back to you within 24 hours.</div>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Contact Methods - Simple hover effects */}
      <section
        id="contact-info"
        data-animate
        className={`py-20 bg-gray-950 relative transition-all duration-1000 ${
          isVisible["contact-info"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">Get in Touch Directly</h2>
            <p className="text-xl text-gray-400">Choose your preferred way to connect</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <Link
                key={index}
                href={method.href}
                className="group bg-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 hover:border-gray-500 hover:scale-105 transition-all duration-300 hover:shadow-xl"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {method.label}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-2 break-all">
                    {method.value}
                  </p>
                  <p className="text-gray-500 text-sm">{method.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Simple accordion-style */}
      <section
        id="faq"
        data-animate
        className={`py-20 bg-black relative transition-all duration-1000 ${
          isVisible.faq ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-400">Quick answers to common questions</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 hover:border-gray-500 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-4">{faq.question}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Simple and clean */}
      <section className="py-20 bg-gray-950 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-12">
            <h2 className="text-4xl font-black text-white mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's turn your ideas into reality. I'm here to help you build something amazing.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="#contact-form"
                onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Send Message
              </Link>
              <Link
                href="/projects"
                className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105"
              >
                View My Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Focused Custom Styles */}
      <style jsx>{`
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

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default ContactPage

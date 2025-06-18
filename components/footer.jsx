"use client"

import Link from "next/link"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Store", href: "#store" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ]

  const socialLinks = [
    { name: "GitHub", href: "#", icon: "🔗" },
    { name: "LinkedIn", href: "#", icon: "💼" },
    { name: "Twitter", href: "#", icon: "🐦" },
    { name: "Instagram", href: "#", icon: "📸" },
    { name: "Email", href: "mailto:hello@ascendry.com", icon: "✉️" },
  ]

  return (
    <footer className="bg-black border-t border-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(255,255,255,0.01)_50%,transparent_51%)] bg-[size:40px_40px]"></div>

      {/* Geometric Shapes */}
      <div className="absolute top-10 left-10 w-16 h-16 border border-gray-800 rotate-45 animate-spin-slow opacity-20"></div>
      <div className="absolute top-20 right-20 w-12 h-12 bg-blue-900/10 rotate-12 animate-pulse"></div>
      <div className="absolute bottom-10 left-1/3 w-8 h-8 border border-gray-700 rounded-full animate-bounce opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="bg-white hover:bg-gray-200 transition-all duration-300 rounded-lg w-12 h-12 flex items-center justify-center group cursor-pointer">
                  <div className="bg-black rounded-sm w-8 h-8 group-hover:scale-110 transition-transform duration-300"></div>
                </div>
              </div>
              <span className="font-black text-3xl text-white">ASCENDRY</span>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
              Transforming ideas into powerful digital solutions. Building the future, one line of code at a time.
            </p>

            {/* Motto */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
              <blockquote className="text-white font-medium text-lg italic">
                "Code is poetry written in logic."
              </blockquote>
              <cite className="text-gray-400 text-sm mt-2 block">— Ascendry Philosophy</cite>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6 relative">
              QUICK LINKS
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-blue-500"></div>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-all duration-300 flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-white group-hover:scale-150 transition-all duration-300"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6 relative">
              CONNECT
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-blue-500"></div>
            </h3>
            <div className="space-y-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center group-hover:bg-white group-hover:border-white group-hover:scale-110 transition-all duration-300">
                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </span>
                  </div>
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">
                    {social.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              <p>© {currentYear} Ascendry. All rights reserved.</p>
              <p className="mt-1">Created with ❤️ by Lenny</p>
            </div>

            {/* Additional Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Sitemap
              </Link>
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group bg-gray-900 hover:bg-white border border-gray-800 hover:border-white text-gray-400 hover:text-black px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <span className="text-sm font-medium">Back to Top</span>
              <span className="transform group-hover:-translate-y-1 transition-transform duration-300">↑</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
    </footer>
  )
}

export default Footer

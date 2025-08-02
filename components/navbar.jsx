"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Logo from '../app/favicon.ico'


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true)
      } else {
        setHidden(false)
      }

      // Change navbar style when scrolled
      setScrolled(currentScrollY > 50)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "services" },
    { name: "Projects", href: "projects" },
    { name: "Store", href: "store" },
    { name: "Contact", href: "contact" },
  ]

  return (
    <nav
      className={`fixed left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4 transition-all duration-500 ease-in-out ${
        hidden ? "-top-24" : scrolled ? "top-2" : "top-6"
      }`}
    >
      <div
        className={`transition-all duration-500 ease-in-out ${
          scrolled
            ? "bg-black/95 backdrop-blur-xl shadow-2xl border border-gray-700/50 rounded-xl"
            : "bg-black/80 backdrop-blur-lg shadow-xl border border-gray-600/30 rounded-2xl"
        }`}
      >
        <div className={`transition-all duration-500 ${scrolled ? "px-6 py-2" : "px-8 py-4"}`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="group flex items-center space-x-3">
                <div className="relative">
                  <Image src={Logo} width={45} alt="Ascendry Logo"/>
                </div>
                <span
                  className={`font-black text-white group-hover:text-gray-200 transition-all duration-300 ${
                    scrolled ? "text-xl" : "text-2xl"
                  }`}
                >
                  ASCENDRY
                </span>
              </a>
            </div>

            {/* Centered Desktop Navigation */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
              <div className={`flex items-center transition-all duration-300 ${scrolled ? "space-x-6" : "space-x-8"}`}>
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative text-gray-400 hover:text-white font-semibold transition-all duration-300 group ${
                      scrolled ? "px-2 py-1 text-sm" : "px-3 py-2 text-sm"
                    }`}
                  >
                    {link.name}
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                href="hire"
                className={`bg-white hover:bg-gray-200 text-black font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group ${
                  scrolled ? "px-4 py-2 text-sm" : "px-6 py-3 text-base"
                }`}
              >
                <span className="relative z-10">Hire Me</span>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`text-white hover:text-gray-400 transition-all duration-300 relative ${
                  scrolled ? "p-2" : "p-2"
                }`}
              >
                <div className={`relative transition-all duration-300 ${scrolled ? "w-5 h-5" : "w-6 h-6"}`}>
                  <span
                    className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${
                      isOpen ? "rotate-45 top-1/2 -translate-y-0.5" : scrolled ? "top-1" : "top-1"
                    }`}
                  ></span>
                  <span
                    className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 top-1/2 -translate-y-0.5 ${
                      isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                    }`}
                  ></span>
                  <span
                    className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${
                      isOpen ? "-rotate-45 top-1/2 -translate-y-0.5" : scrolled ? "bottom-1" : "bottom-1"
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-6 py-4 border-t border-gray-700/50 bg-black/50 backdrop-blur-xl rounded-b-xl">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-400 hover:text-white py-3 px-4 font-medium transition-all duration-300 hover:bg-white/5 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="hire"
                className="block bg-white text-black px-4 py-3 mt-4 text-center font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Hire Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

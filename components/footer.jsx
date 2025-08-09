import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative z-10 py-12 px-4 bg-slate-950 text-white">
      <div className="container mx-auto max-w-7xl flex flex-col items-center">
        {/* Top: Logo + Brand Name */}
        <div className="flex items-center space-x-3 mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/Ascendry.png" alt="Ascendry Logo" width={48} height={48} className="rounded-full" />
            <span className="text-4xl font-extrabold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ascendry
            </span>
          </Link>
        </div>

        {/* Middle: Horizontal Line */}
        <div className="w-full border-t border-white/10 mb-8" />

        {/* Bottom: Copyright & Social Media */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full text-sm text-slate-400">
          <p className="mb-4 md:mb-0">© {new Date().getFullYear()} Ascendry. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-blue-400 transition-colors" aria-label="Facebook">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="hover:text-blue-400 transition-colors" aria-label="Twitter">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" className="hover:text-blue-400 transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link href="#" className="hover:text-blue-400 transition-colors" aria-label="YouTube">
              <Youtube className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

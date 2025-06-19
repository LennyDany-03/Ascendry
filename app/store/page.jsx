
import { useState } from "react"
import Navbar from "../../components/navbar.jsx"
import Footer from "../../components/footer.jsx"
import InteractiveBackground from "../../components/interactive-background"
import ProductCard from "../../components/product-card.jsx"
import Link from "next/link"

const StorePage = () => {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const products = [
    {
      id: "novapay-template",
      title: "NovaPay - UPI Expense Tracker",
      description:
        "Complete React template for UPI expense tracking with dashboard, analytics, and backend integration. Includes source code, documentation, and deployment guide.",
      techStack: ["React", "Supabase", "Tailwind CSS", "Chart.js", "Vite"],
      price: 799,
      originalPrice: 999,
      category: "template",
      isPopular: true,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "clubsphere-admin",
      title: "ClubSphere Admin Panel",
      description:
        "Full-featured admin dashboard for college club management with event handling, member management, and analytics. Perfect for educational institutions.",
      techStack: ["React", "Firebase", "Material-UI", "Node.js"],
      price: 499,
      category: "template",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "hospital-chatbot",
      title: "Hospital ChatBot Template",
      description:
        "AI-powered healthcare chatbot supporting Tamil and English. Includes NLP processing, appointment booking, and medical consultation features.",
      techStack: ["Python", "TensorFlow", "Flask", "React", "MongoDB"],
      price: 699,
      category: "template",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "tailwind-ui-kit",
      title: "Tailwind UI Component Kit",
      description:
        "50+ premium UI components built with Tailwind CSS. Cards, buttons, forms, navigation, and more. Copy-paste ready code snippets.",
      techStack: ["Tailwind CSS", "React", "TypeScript", "Storybook"],
      price: 199,
      category: "ui-kit",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "dark-portfolio-template",
      title: "Dark Theme Portfolio Template",
      description:
        "Modern dark theme portfolio template with animations, interactive background, and responsive design. Perfect for developers and designers.",
      techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
      price: 299,
      category: "template",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "church-ministry-template",
      title: "Church Ministry Website Template",
      description:
        "Complete church website template with event management, donation integration, media gallery, and member portal. Fully customizable.",
      techStack: ["Next.js", "Stripe", "Sanity CMS", "Tailwind CSS"],
      price: 0,
      isFree: true,
      category: "template",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ]

  const categories = [
    { id: "all", name: "All Products" },
    { id: "template", name: "Templates" },
    { id: "ui-kit", name: "UI Kits" },
    { id: "tools", name: "Tools" },
  ]

  const filters = [
    { id: "all", name: "All" },
    { id: "free", name: "Free" },
    { id: "paid", name: "Paid" },
  ]

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory
    const filterMatch =
      selectedFilter === "all" ||
      (selectedFilter === "free" && product.isFree) ||
      (selectedFilter === "paid" && !product.isFree)

    return categoryMatch && filterMatch
  })

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
              <span className="text-gray-300 font-medium">Digital Marketplace</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 relative">
            <span className="text-white">ASCENDRY</span>
            <br />
            <span className="text-blue-500">STORE</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            Premium digital tools, templates, and source codes crafted for developers & creators.
          </p>

          <button className="group bg-white hover:bg-gray-200 text-black px-10 py-4 font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden">
            <span className="relative z-10">Explore Products</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-10 bg-gray-950 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Categories */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 font-medium">Categories:</span>
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filters */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 font-medium">Filter:</span>
              <div className="flex space-x-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedFilter === filter.id
                        ? "bg-white text-black"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-black relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-20">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-4">No products found</h3>
              <p className="text-gray-400 mb-8">Try adjusting your filters or check back later for new products.</p>
              <button
                onClick={() => {
                  setSelectedFilter("all")
                  setSelectedCategory("all")
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-950 relative">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="bg-black border border-gray-800 rounded-2xl p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,64,175,0.1),transparent_70%)]"></div>

            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-6 text-white">Want a Custom Version?</h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Need something tailored to your specific requirements? I can build it your way with custom features and
                branding.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="#contact"
                  className="group bg-white hover:bg-gray-200 text-black px-10 py-4 font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                >
                  <span className="relative z-10">Hire Me</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Link>

                <Link
                  href="/services"
                  className="border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 font-bold text-lg transition-all duration-300 hover:scale-105"
                >
                  View Services
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

export default StorePage

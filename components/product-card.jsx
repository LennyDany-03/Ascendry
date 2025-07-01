"use client"

import Link from "next/link"
import {
  Star,
  Download,
  Code,
  Globe,
  Smartphone,
  Database,
  Palette,
  ShoppingCart,
  Brain,
  Target,
  Users,
  CreditCard,
  Heart,
  MessageSquare,
  Briefcase,
  Gift,
  Eye,
} from "lucide-react"

const ProductCard = ({ product = {} }) => {
  const {
    id = "",
    title = "Untitled Product",
    description = "No description available",
    tech_stack = [],
    price = 0,
    original_price,
    thumbnail,
    demo_url,
    download_url,
    is_free = false,
    is_popular = false,
    category = "template",
    gradient = "from-blue-500 to-purple-500",
    icon = "Code",
    features = [],
    downloads = "0+",
    rating = 4.5,
    complexity = "Intermediate",
    slug = "",
  } = product

  // Return null if no valid product data
  if (!id) {
    return null
  }

  // Safe array handling for tech_stack
  const techStack = Array.isArray(tech_stack) ? tech_stack.filter(Boolean) : []
  const productFeatures = Array.isArray(features) ? features.filter(Boolean) : []

  // Icon mapping
  const getIconComponent = (iconName) => {
    const icons = {
      Code,
      Globe,
      Smartphone,
      Database,
      Palette,
      ShoppingCart,
      Brain,
      Target,
      Users,
      CreditCard,
      Heart,
      MessageSquare,
      Briefcase,
    }
    return icons[iconName] || Code
  }

  const IconComponent = getIconComponent(icon)

  // Calculate discount percentage
  const discountPercentage =
    original_price && price && original_price > price
      ? Math.round(((original_price - price) / original_price) * 100)
      : 0

  return (
    <div className="group bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-600/50 transition-all duration-300">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`}></div>
        {thumbnail ? (
          <img
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none"
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <IconComponent className="w-16 h-16 text-gray-400 opacity-40" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {is_popular && (
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
              <Star className="w-3 h-3" />
              <span>POPULAR</span>
            </div>
          )}
          {is_free && (
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
              <Gift className="w-3 h-3" />
              <span>FREE</span>
            </div>
          )}
          {discountPercentage > 0 && (
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              -{discountPercentage}%
            </div>
          )}
        </div>

        {/* Price */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-black/80 backdrop-blur-sm px-3 py-2 rounded-xl border border-gray-700">
            {is_free ? (
              <span className="text-green-400 font-bold text-lg flex items-center space-x-1">
                <Gift className="w-4 h-4" />
                <span>FREE</span>
              </span>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-white font-bold text-lg">₹{price || 0}</span>
                {original_price && <span className="text-gray-400 line-through text-sm">₹{original_price}</span>}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {demo_url && (
            <a
              href={demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-black/80 backdrop-blur-sm hover:bg-black text-white rounded-lg flex items-center justify-center transition-colors duration-300"
            >
              <Eye className="w-4 h-4" />
            </a>
          )}
          {download_url && (
            <a
              href={download_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-blue-500/80 backdrop-blur-sm hover:bg-blue-500 text-white rounded-lg flex items-center justify-center transition-colors duration-300"
            >
              <Download className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Product Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-blue-400 text-xs font-medium uppercase tracking-wider">{category || "Product"}</span>
          <div className="flex items-center space-x-1 text-yellow-400">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs">{rating || "4.5"}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Tech Stack */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {techStack.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 text-gray-300 text-xs rounded"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 3 && (
              <span className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 text-gray-300 text-xs rounded">
                +{techStack.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Features */}
        {productFeatures.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {productFeatures.slice(0, 2).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs rounded"
                >
                  {feature}
                </span>
              ))}
              {productFeatures.length > 2 && (
                <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs rounded">
                  +{productFeatures.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center space-x-1 text-blue-400">
            <Download className="w-3 h-3" />
            <span>{downloads || "0+"}</span>
          </div>
          <div className="text-gray-400">{complexity || "Intermediate"}</div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Link
            href={demo_url || `/store/${slug || id}`}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-center"
          >
            View Details
          </Link>

          <Link
            href={download_url || `#buy-${id}`}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-center"
          >
            {is_free ? "Download" : "Buy Now"}
          </Link>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  )
}

export default ProductCard

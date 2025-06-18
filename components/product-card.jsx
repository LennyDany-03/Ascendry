"use client"

import Link from "next/link"

const ProductCard = ({ product = {} }) => {
  const {
    id = "",
    title = "Untitled Product",
    description = "No description available",
    techStack = [],
    price = 0,
    originalPrice,
    thumbnail,
    detailsUrl,
    buyUrl,
    isFree = false,
    isPopular = false,
  } = product

  // Return null if no valid product data
  if (!id) {
    return null
  }

  return (
    <div className="group bg-gray-950 border border-gray-800 hover:border-white hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 relative">
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute top-4 right-4 z-10 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          POPULAR
        </div>
      )}

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Thumbnail */}
      <div className="h-48 bg-gradient-to-br from-gray-900 to-gray-800 group-hover:from-gray-800 group-hover:to-gray-700 transition-all duration-300 relative overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail || "/placeholder.svg?height=200&width=300"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity duration-300">🛍️</div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.05)_50%,transparent_60%)] bg-[size:30px_30px] animate-pulse"></div>
          </div>
        )}

        {/* Price Overlay */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-700">
            {isFree ? (
              <span className="text-green-400 font-bold text-lg">FREE</span>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-white font-bold text-lg">₹{price}</span>
                {originalPrice && <span className="text-gray-400 line-through text-sm">₹{originalPrice}</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-400 mb-4 group-hover:text-gray-200 transition-colors duration-300 line-clamp-3">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {techStack.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-900 border border-gray-700 text-gray-300 text-xs rounded group-hover:border-gray-600 group-hover:text-white transition-all duration-300"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 4 && (
              <span className="px-2 py-1 bg-gray-900 border border-gray-700 text-gray-300 text-xs rounded">
                +{techStack.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Link
            href={detailsUrl || `/store/${id}`}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-center"
          >
            View Details
          </Link>

          <Link
            href={buyUrl || `#buy-${id}`}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-center"
          >
            {isFree ? "Download" : "Buy Now"}
          </Link>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  )
}

export default ProductCard

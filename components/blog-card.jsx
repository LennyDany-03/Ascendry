"use client"

import Link from "next/link"

const BlogCard = ({ post = {} }) => {
  const {
    id = "",
    title = "Untitled Post",
    excerpt = "No excerpt available",
    date = new Date().toISOString(),
    tags = [],
    thumbnail,
    readTime = "5 min read",
    author = "Lenny",
  } = post

  // Return null if no valid post data
  if (!id) {
    return null
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <article className="group bg-gray-950 border border-gray-800 hover:border-white hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 relative">
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Thumbnail */}
      <div className="h-48 bg-gradient-to-br from-gray-900 to-gray-800 group-hover:from-gray-800 group-hover:to-gray-700 transition-all duration-300 relative overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail || "/placeholder.svg?height=200&width=400"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity duration-300">📝</div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.05)_50%,transparent_60%)] bg-[size:30px_30px] animate-pulse"></div>
          </div>
        )}

        {/* Read Time Overlay */}
        <div className="absolute top-4 right-4">
          <div className="bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-700">
            <span className="text-white text-sm font-medium">{readTime}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        {/* Meta Info */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400">
          <span>{formatDate(date)}</span>
          <span>•</span>
          <span>By {author}</span>
        </div>

        <h2 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
          {title}
        </h2>

        <p className="text-gray-400 mb-4 group-hover:text-gray-200 transition-colors duration-300 line-clamp-3">
          {excerpt}
        </p>

        {/* Tags */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-900 border border-gray-700 text-gray-300 text-xs rounded group-hover:border-gray-600 group-hover:text-white transition-all duration-300"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-900 border border-gray-700 text-gray-300 text-xs rounded">
                +{tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Read More Button */}
        <Link
          href={`/blog/${id}`}
          className="inline-flex items-center space-x-2 text-white hover:text-blue-400 font-semibold transition-all duration-300 group/link"
        >
          <span>Read More</span>
          <span className="transform group-hover/link:translate-x-1 transition-transform duration-300">→</span>
        </Link>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </article>
  )
}

export default BlogCard

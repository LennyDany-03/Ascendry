"use client"

import Link from "next/link"

const ProjectCard = ({ project }) => {
  const { id, title, description, techStack = [], thumbnail, githubUrl, liveUrl, detailsUrl } = project

  return (
    <div className="group bg-gray-950 border border-gray-800 hover:border-white hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 relative">
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Thumbnail */}
      <div className="h-48 bg-gradient-to-br from-gray-900 to-gray-800 group-hover:from-gray-800 group-hover:to-gray-700 transition-all duration-300 relative overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity duration-300">💻</div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.05)_50%,transparent_60%)] bg-[size:30px_30px] animate-pulse"></div>
          </div>
        )}

        {/* Tech Stack Overlay */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {techStack.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-black/80 backdrop-blur-sm text-white text-xs font-medium rounded border border-gray-700"
            >
              {tech}
            </span>
          ))}
          {techStack.length > 3 && (
            <span className="px-2 py-1 bg-black/80 backdrop-blur-sm text-white text-xs font-medium rounded border border-gray-700">
              +{techStack.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-400 mb-6 group-hover:text-gray-200 transition-colors duration-300 line-clamp-3">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-full group-hover:border-gray-600 group-hover:text-white transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {liveUrl && (
              <Link
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 font-semibold transition-colors duration-300 flex items-center space-x-2 group/link"
              >
                <span>Live Demo</span>
                <span className="transform group-hover/link:translate-x-1 transition-transform duration-300">↗</span>
              </Link>
            )}

            {githubUrl && (
              <Link
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white font-semibold transition-colors duration-300 flex items-center space-x-2 group/link"
              >
                <span>GitHub</span>
                <span className="transform group-hover/link:translate-x-1 transition-transform duration-300">↗</span>
              </Link>
            )}
          </div>

          {detailsUrl && (
            <Link
              href={detailsUrl}
              className="bg-white/10 hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              View Details
            </Link>
          )}
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  )
}

export default ProjectCard

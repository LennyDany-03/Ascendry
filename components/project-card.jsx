"use client"

import Link from "next/link"
import { ExternalLink, Github, Calendar, Clock, TrendingUp, Play, BookOpen, ArrowRight } from "lucide-react"

const ProjectCard = ({ project }) => {
  const {
    id,
    title,
    subtitle,
    description,
    techStack = [],
    thumbnail,
    githubUrl,
    liveUrl,
    detailsUrl,
    category,
    status,
    duration,
    year,
    gradient,
    icon: IconComponent,
    metrics,
    complexity,
    impact,
  } = project

  const complexityColors = {
    Low: "text-green-400 bg-green-500/10 border-green-500/30",
    Medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
    High: "text-orange-400 bg-orange-500/10 border-orange-500/30",
    "Very High": "text-red-400 bg-red-500/10 border-red-500/30",
  }

  return (
    <div className="group relative bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-xl border border-gray-700/30 hover:border-purple-500/50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      ></div>

      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-30 transition-all duration-500`}
        ></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Project Icon */}
        <div className="absolute top-4 left-4">
          <div
            className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}
          >
            {IconComponent && <IconComponent className="w-5 h-5 text-white" />}
          </div>
        </div>

        {/* Status & Complexity */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <div className="bg-green-500/20 border border-green-500/30 px-2 py-1 rounded-lg backdrop-blur-sm">
            <span className="text-green-400 text-xs font-medium flex items-center space-x-1">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
              <span>{status}</span>
            </span>
          </div>
          {complexity && (
            <div
              className={`px-2 py-1 rounded-lg backdrop-blur-sm border text-xs font-medium ${complexityColors[complexity] || complexityColors.Medium}`}
            >
              {complexity}
            </div>
          )}
        </div>

        {/* Year & Duration */}
        <div className="absolute bottom-4 left-4 flex space-x-2">
          <div className="bg-black/60 backdrop-blur-sm border border-gray-700/50 px-2 py-1 rounded-lg">
            <div className="flex items-center space-x-1 text-white">
              <Calendar className="w-3 h-3" />
              <span className="text-xs font-medium">{year}</span>
            </div>
          </div>
          {duration && (
            <div className="bg-black/60 backdrop-blur-sm border border-gray-700/50 px-2 py-1 rounded-lg">
              <div className="flex items-center space-x-1 text-white">
                <Clock className="w-3 h-3" />
                <span className="text-xs font-medium">{duration}</span>
              </div>
            </div>
          )}
        </div>

        {/* Project Image */}
        {thumbnail ? (
          <img
            src={thumbnail || "/placeholder.svg"}
            alt={title || "Project"}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.style.display = "none"
              e.target.nextElementSibling.style.display = "flex"
            }}
          />
        ) : null}

        {/* Fallback Placeholder */}
        <div className={`absolute inset-0 flex items-center justify-center ${thumbnail ? "hidden" : ""}`}>
          <div className="text-4xl opacity-40 group-hover:opacity-60 transition-opacity duration-300">💻</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category & Title */}
        <div className="mb-4">
          <div className="text-blue-400 font-semibold text-xs uppercase tracking-wider mb-1">{category}</div>
          <h3 className="text-xl font-black text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
            {title}
          </h3>
          {subtitle && <div className="text-sm text-gray-400 font-medium mb-2">{subtitle}</div>}
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">{description}</p>

        {/* Impact */}
        {impact && (
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-3 mb-4">
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="w-3 h-3 text-blue-400" />
              <span className="text-blue-400 font-semibold text-xs">Impact</span>
            </div>
            <p className="text-white font-medium text-xs">{impact}</p>
          </div>
        )}

        {/* Metrics */}
        {metrics && Object.keys(metrics).length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {Object.entries(metrics).map(([key, value], idx) => (
              <div key={idx} className="text-center">
                <div className="text-sm font-black text-white mb-1">{value}</div>
                <div className="text-gray-400 text-xs capitalize">{key}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        <div className="mb-4">
          <div className="text-gray-300 font-semibold mb-2 flex items-center space-x-2 text-xs">
            <span>Technologies</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {techStack.slice(0, 4).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 text-gray-300 text-xs rounded-lg hover:border-gray-600/50 hover:text-white transition-all duration-300"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 4 && (
              <span className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 text-gray-300 text-xs rounded-lg">
                +{techStack.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-3 py-2 rounded-lg font-semibold text-xs transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Play className="w-3 h-3" />
              <span>Live</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          )}

          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-1 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 text-white px-3 py-2 rounded-lg font-semibold text-xs transition-all duration-300 hover:scale-105"
            >
              <Github className="w-3 h-3" />
              <span>Code</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          )}

          {detailsUrl && (
            <Link
              href={detailsUrl}
              className="group flex items-center space-x-1 border-2 border-white hover:bg-white hover:text-black text-white px-3 py-2 rounded-lg font-semibold text-xs transition-all duration-300 hover:scale-105"
            >
              <BookOpen className="w-3 h-3" />
              <span>Details</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          )}
        </div>
      </div>

      {/* Bottom Accent */}
      <div
        className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
      ></div>
    </div>
  )
}

export default ProjectCard

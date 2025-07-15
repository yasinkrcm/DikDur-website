"use client"
import { useState } from "react"

export default function FeatureCard({ icon: Icon, title, description, gradient, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200`}
      ></div>

      {/* Main card */}
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/20 h-full">
        {/* Icon container */}
        <div className="relative mb-6">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${gradient} shadow-lg transform transition-transform duration-300 ${isHovered ? "rotate-6 scale-110" : ""}`}
          >
            <Icon className="h-10 w-10 text-white" />
          </div>

          {/* Floating particles */}
          {isHovered && (
            <>
              <div className="absolute top-0 right-0 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-0 left-0 w-1 h-1 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-pulse"></div>
            </>
          )}
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
          {title}
        </h3>

        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>

        {/* Hover indicator */}
        <div
          className={`absolute bottom-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center transform ${isHovered ? "scale-100" : "scale-0"}`}
        >
          <Icon className="h-4 w-4 text-white" />
        </div>
      </div>
    </div>
  )
}

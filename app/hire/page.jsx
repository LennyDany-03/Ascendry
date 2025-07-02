"use client"

import { useState, useRef, useEffect } from "react"
import Navbar from "../../components/navbar.jsx"
import Footer from "../../components/footer.jsx"
import InteractiveBackground from "../../components/interactive-background"
import Link from "next/link"
import { hireMeAPI } from "../../lib/supabaseClient"

const HirePage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    projectDescription: "",
    contactMethod: "",
    availableTime: "",
    availableDate: "",
    hearAbout: "",
  })
  const [attachments, setAttachments] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showTickAnimation, setShowTickAnimation] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef(null)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/zip",
      "application/x-zip-compressed",
    ]

    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`)
        return false
      }
      if (!allowedTypes.includes(file.type)) {
        alert(`File ${file.name} has an unsupported format.`)
        return false
      }
      return true
    })

    setAttachments(validFiles)
  }

  const removeFile = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")
    setUploadProgress(0)

    try {
      // Prepare form data for submission - convert empty strings to null for optional fields
      const submissionData = {
        full_name: formData.fullName,
        email: formData.email,
        company: formData.company || null,
        project_type: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        project_description: formData.projectDescription,
        contact_method: formData.contactMethod,
        available_time: formData.availableTime || null,
        available_date: formData.availableDate || null, // Convert empty string to null
        hear_about: formData.hearAbout || null,
        status: "new",
        priority: "medium",
      }

      // Show upload progress if files are present
      if (attachments.length > 0) {
        setUploadProgress(25)
      }

      // Submit to Supabase with file uploads
      await hireMeAPI.submit(submissionData, attachments)

      setUploadProgress(100)
      setIsSubmitting(false)
      setShowSuccessModal(true)

      // Trigger tick animation after modal appears
      setTimeout(() => {
        setShowTickAnimation(true)
      }, 300)

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        projectDescription: "",
        contactMethod: "",
        availableTime: "",
        availableDate: "",
        hearAbout: "",
      })
      setAttachments([])
      setUploadProgress(0)

      // Auto close modal after 4 seconds
      setTimeout(() => {
        setShowSuccessModal(false)
        setShowTickAnimation(false)
      }, 4000)
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitError("Failed to submit form. Please try again.")
      setIsSubmitting(false)
      setUploadProgress(0)
    }
  }

  const closeModal = () => {
    setShowSuccessModal(false)
    setShowTickAnimation(false)
  }

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showSuccessModal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [showSuccessModal])

  const projectTypes = [
    "Website Development",
    "Mobile App (iOS/Android)",
    "AI/ML Application",
    "Full-Stack Web App",
    "E-commerce Platform",
    "Consulting & Strategy",
    "Maintenance & Updates",
    "Custom Software Solution",
    "Other",
  ]

  const budgetRanges = ["₹10k - ₹25k", "₹25k - ₹50k", "₹50k - ₹1L", "₹1L - ₹2L", "₹2L+", "Let's Discuss"]

  const timelines = ["1 Week", "2-4 Weeks", "1-2 Months", "2-3 Months", "3+ Months", "Flexible"]

  const hearAboutOptions = [
    "GitHub Profile",
    "LinkedIn",
    "Google Search",
    "Word of Mouth",
    "Social Media",
    "Portfolio Website",
    "Referral",
    "Other",
  ]

  return (
    <div className="min-h-screen bg-black text-white relative">
      <InteractiveBackground />
      <Navbar />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in" onClick={closeModal} />

          {/* Modal Content */}
          <div className="relative bg-gray-900 border border-gray-700 rounded-3xl p-12 max-w-md mx-4 text-center animate-scale-in shadow-2xl">
            {/* Tick Animation */}
            <div className="mb-8">
              <div
                className={`w-24 h-24 mx-auto rounded-full border-4 border-green-500 flex items-center justify-center ${showTickAnimation ? "animate-tick-circle" : ""}`}
              >
                <svg
                  className={`w-12 h-12 text-green-500 ${showTickAnimation ? "animate-tick-draw" : "opacity-0"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                    className="tick-path"
                  />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-white">Request Sent!</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Thanks for reaching out! I'll get back to you within 24-48 hours.
              </p>
              {attachments.length > 0 && (
                <p className="text-sm text-blue-400">
                  📎 {attachments.length} file{attachments.length > 1 ? "s" : ""} uploaded successfully
                </p>
              )}
              <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Let's build something amazing together!
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all duration-300 hover:scale-105"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center justify-center space-x-3 text-sm">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                Home
              </Link>
              <span className="text-gray-600">→</span>
              <span className="text-blue-400 font-medium">Hire Me</span>
            </div>
          </nav>

          {/* Status Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-green-500/10 backdrop-blur-sm rounded-full border border-green-500/30">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">Available for New Projects</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
              Let's Build Your
            </span>
            <br />
            <span className="text-white">Vision Together</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            Ready to transform your ideas into reality? Fill out the form below and let's create something
            extraordinary.
          </p>
        </div>
      </section>

      {/* Error Message */}
      {submitError && (
        <div className="max-w-5xl mx-auto px-6 mb-8">
          <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-4 text-center">
            <p className="text-red-400">{submitError}</p>
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {isSubmitting && uploadProgress > 0 && (
        <div className="max-w-5xl mx-auto px-6 mb-8">
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 font-medium">Uploading files...</span>
                  <span className="text-blue-400 font-bold">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modern Form Section */}
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-6">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Personal Information Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-10 hover:border-gray-600/50 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Personal Information</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Full Name */}
                  <div className="space-y-3">
                    <label className="block text-gray-300 font-medium">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/40 border border-gray-600/50 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-3">
                    <label className="block text-gray-300 font-medium">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/40 border border-gray-600/50 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300 backdrop-blur-sm"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="mt-8 space-y-3">
                  <label className="block text-gray-300 font-medium">
                    Company / Brand <span className="text-gray-500">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-gray-600/50 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Your company or brand name"
                  />
                </div>
              </div>
            </div>

            {/* Project Details Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-10 hover:border-gray-600/50 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Project Details</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Project Type */}
                  <div className="space-y-3">
                    <label className="block text-gray-300 font-medium">
                      Project Type <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/40 border border-gray-600/50 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300 backdrop-blur-sm"
                    >
                      <option value="" className="bg-gray-900">
                        Select project type
                      </option>
                      {projectTypes.map((type, index) => (
                        <option key={index} value={type} className="bg-gray-900">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget */}
                  <div className="space-y-3">
                    <label className="block text-gray-300 font-medium">
                      Estimated Budget <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/40 border border-gray-600/50 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300 backdrop-blur-sm"
                    >
                      <option value="" className="bg-gray-900">
                        Select budget range
                      </option>
                      {budgetRanges.map((budget, index) => (
                        <option key={index} value={budget} className="bg-gray-900">
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mt-8 space-y-3">
                  <label className="block text-gray-300 font-medium">
                    Project Timeline <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/40 border border-gray-600/50 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    <option value="" className="bg-gray-900">
                      Select timeline
                    </option>
                    {timelines.map((timeline, index) => (
                      <option key={index} value={timeline} className="bg-gray-900">
                        {timeline}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project Description */}
                <div className="mt-8 space-y-3">
                  <label className="block text-gray-300 font-medium">
                    Describe Your Project <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full bg-black/40 border border-gray-600/50 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300 resize-none backdrop-blur-sm"
                    placeholder="Describe your project vision, goals, and specific requirements..."
                  ></textarea>
                </div>

                {/* File Attachments */}
                <div className="mt-8 space-y-3">
                  <label className="block text-gray-300 font-medium">
                    Attachments <span className="text-gray-500">(Optional - Max 10MB per file)</span>
                  </label>
                  <div className="space-y-4">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-600/50 rounded-2xl p-8 text-center hover:border-white/50 hover:bg-white/5 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">📎</div>
                      <p className="text-gray-400 mb-2 text-lg">Drop files here or click to upload</p>
                      <p className="text-gray-500">PDF, DOC, TXT, Images, ZIP files supported</p>
                      <p className="text-gray-600 text-sm mt-2">Maximum 10MB per file</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.webp,.zip"
                    />

                    {/* File List */}
                    {attachments.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-gray-300 font-medium">Selected Files:</h4>
                        {attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-black/40 backdrop-blur-sm rounded-xl px-4 py-3 border border-gray-600/50"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-blue-400 text-xs font-bold">
                                  {file.name.split(".").pop().toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-300 font-medium">{file.name}</span>
                                <div className="text-gray-500 text-sm">{formatFileSize(file.size)}</div>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-red-400 hover:text-red-300 transition-colors duration-300 p-2 hover:bg-red-500/10 rounded-lg"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Communication Preferences Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-10 hover:border-gray-600/50 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Communication Preferences</h3>
                </div>

                {/* Contact Method */}
                <div className="mb-8 space-y-4">
                  <label className="block text-gray-300 font-medium">
                    Preferred Contact Method <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["Email", "WhatsApp", "Zoom Call"].map((method) => (
                      <label key={method} className="relative cursor-pointer">
                        <input
                          type="radio"
                          name="contactMethod"
                          value={method}
                          checked={formData.contactMethod === method}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 text-center ${
                            formData.contactMethod === method
                              ? "border-white bg-white/10 text-white"
                              : "border-gray-600/50 bg-black/20 text-gray-400 hover:border-gray-500 hover:text-gray-300"
                          }`}
                        >
                          <span className="font-medium">{method}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Available Time */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="block text-gray-300 font-medium">Available Date</label>
                    <input
                      type="date"
                      name="availableDate"
                      value={formData.availableDate}
                      onChange={handleInputChange}
                      className="w-full bg-black/40 border border-gray-600/50 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-gray-300 font-medium">Available Time</label>
                    <input
                      type="time"
                      name="availableTime"
                      value={formData.availableTime}
                      onChange={handleInputChange}
                      className="w-full bg-black/40 border border-gray-600/50 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>
                </div>

                {/* How did you hear about me */}
                <div className="mt-8 space-y-3">
                  <label className="block text-gray-300 font-medium">How did you hear about me?</label>
                  <select
                    name="hearAbout"
                    value={formData.hearAbout}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-gray-600/50 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    <option value="" className="bg-gray-900">
                      Select an option
                    </option>
                    {hearAboutOptions.map((option, index) => (
                      <option key={index} value={option} className="bg-gray-900">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Confidentiality Note */}
            <div className="bg-gray-900/40 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🔒</span>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2 text-lg">Confidentiality & File Security</h4>
                  <p className="text-gray-400 leading-relaxed">
                    All submissions and file uploads are confidential and securely stored. I respect your privacy and
                    never share your data. Your project details and attachments are completely safe with me.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative px-16 py-6 bg-white text-black font-bold text-xl rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden ${
                  isSubmitting ? "animate-pulse" : ""
                }`}
              >
                <span className="relative z-10 flex items-center space-x-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>{uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : "Submitting Request..."}</span>
                    </>
                  ) : (
                    <>
                      <span>📤</span>
                      <span>Request a Quote</span>
                      <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />

      {/* Custom Styles */}
      <style jsx>{`
      @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes scale-in {
        from { 
          opacity: 0; 
          transform: scale(0.8) translateY(20px); 
        }
        to { 
          opacity: 1; 
          transform: scale(1) translateY(0); 
        }
      }

      @keyframes tick-circle {
        0% { 
          transform: scale(0.8); 
          border-color: #6b7280; 
        }
        50% { 
          transform: scale(1.1); 
          border-color: #10b981; 
        }
        100% { 
          transform: scale(1); 
          border-color: #10b981; 
        }
      }

      @keyframes tick-draw {
        0% { 
          opacity: 0;
          stroke-dasharray: 0 50;
        }
        50% { 
          opacity: 1;
          stroke-dasharray: 25 50;
        }
        100% { 
          opacity: 1;
          stroke-dasharray: 50 50;
        }
      }

      .animate-fade-in {
        animation: fade-in 0.3s ease-out forwards;
      }

      .animate-scale-in {
        animation: scale-in 0.4s ease-out forwards;
      }

      .animate-tick-circle {
        animation: tick-circle 0.6s ease-out forwards;
      }

      .animate-tick-draw {
        animation: tick-draw 0.8s ease-out 0.3s forwards;
      }

      .tick-path {
        stroke-dasharray: 50;
        stroke-dashoffset: 50;
      }
    `}</style>
    </div>
  )
}

export default HirePage

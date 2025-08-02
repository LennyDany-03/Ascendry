"use client"

import { useState, useRef, useEffect } from "react"
import Navbar from "../../components/navbar.jsx"
import Footer from "../../components/footer.jsx"
import InteractiveBackground from "../../components/interactive-background"
import Link from "next/link"
import { supabase } from "../../lib/supabase/client"
import { hireMeAPI } from "../../lib/api"

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
  const [currentStep, setCurrentStep] = useState(1)
  const fileInputRef = useRef(null)

  // Calendar picker states
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(formData.availableDate ? new Date(formData.availableDate) : null)

  // Time picker states
  const [isTimeOpen, setIsTimeOpen] = useState(false)
  const [selectedHour, setSelectedHour] = useState(9)
  const [selectedMinute, setSelectedMinute] = useState(0)
  const [selectedPeriod, setSelectedPeriod] = useState("AM")

  // Update selected date when form data changes
  useEffect(() => {
    if (formData.availableDate && formData.availableDate !== "") {
      const newDate = new Date(formData.availableDate)
      if (!isNaN(newDate.getTime())) {
        setSelectedDate(newDate)
        setCurrentMonth(newDate)
      }
    }
  }, [formData.availableDate])

  // Update time picker when form data changes
  useEffect(() => {
    if (formData.availableTime && formData.availableTime !== "") {
      const [hours, minutes] = formData.availableTime.split(":")
      const hour24 = Number.parseInt(hours, 10)
      const minute = Number.parseInt(minutes, 10)

      if (!isNaN(hour24) && !isNaN(minute)) {
        setSelectedMinute(minute)
        if (hour24 === 0) {
          setSelectedHour(12)
          setSelectedPeriod("AM")
        } else if (hour24 < 12) {
          setSelectedHour(hour24)
          setSelectedPeriod("AM")
        } else if (hour24 === 12) {
          setSelectedHour(12)
          setSelectedPeriod("PM")
        } else {
          setSelectedHour(hour24 - 12)
          setSelectedPeriod("PM")
        }
      }
    }
  }, [formData.availableTime])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Form validation function
  const isFormValid = () => {
    const requiredFields = {
      1: ["fullName", "email"],
      2: ["projectType", "budget", "timeline", "projectDescription"],
      3: ["contactMethod"],
      4: [],
    }

    const currentRequiredFields = requiredFields[currentStep] || []

    return currentRequiredFields.every((field) => {
      const value = formData[field]
      return value && value.toString().trim() !== ""
    })
  }

  // Get missing fields for error messages
  const getMissingFields = () => {
    const requiredFields = {
      1: { fullName: "Full Name", email: "Email Address" },
      2: {
        projectType: "Project Type",
        budget: "Budget Range",
        timeline: "Timeline",
        projectDescription: "Project Description",
      },
      3: { contactMethod: "Contact Method" },
      4: {},
    }

    const currentRequiredFields = requiredFields[currentStep] || {}

    return Object.entries(currentRequiredFields)
      .filter(([field]) => {
        const value = formData[field]
        return !value || value.toString().trim() === ""
      })
      .map(([, label]) => label)
  }

  // Calendar helper functions
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    const formattedDate = date.toISOString().split("T")[0]
    setFormData((prev) => ({
      ...prev,
      availableDate: formattedDate,
    }))
    setIsCalendarOpen(false)
  }

  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev)
      newMonth.setMonth(prev.getMonth() + direction)
      return newMonth
    })
  }

  const isToday = (date) => {
    const today = new Date()
    return (
      date &&
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isSameDay = (date1, date2) => {
    return (
      date1 &&
      date2 &&
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  const isPastDate = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const formatDisplayDate = (date) => {
    if (!date) return "Select your available date"
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Time picker helper functions
  const hours = Array.from({ length: 12 }, (_, i) => i + 1)
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5)

  const formatTime = (hour, minute, period) => {
    return `${hour}:${minute.toString().padStart(2, "0")} ${period}`
  }

  const formatTime24 = (hour, minute, period) => {
    let hour24 = hour
    if (period === "AM" && hour === 12) {
      hour24 = 0
    } else if (period === "PM" && hour !== 12) {
      hour24 = hour + 12
    }
    return `${hour24.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
  }

  const handleTimeSelect = () => {
    const time24 = formatTime24(selectedHour, selectedMinute, selectedPeriod)
    setFormData((prev) => ({
      ...prev,
      availableTime: time24,
    }))
    setIsTimeOpen(false)
  }

  const getDisplayTime = () => {
    if (!formData.availableTime) return "Select your available time"
    const [hours, minutes] = formData.availableTime.split(":")
    const hour24 = Number.parseInt(hours, 10)
    const minute = Number.parseInt(minutes, 10)
    let displayHour = hour24
    let period = "AM"

    if (hour24 === 0) {
      displayHour = 12
    } else if (hour24 > 12) {
      displayHour = hour24 - 12
      period = "PM"
    } else if (hour24 === 12) {
      period = "PM"
    }

    return `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`
  }

  // Quick time options
  const quickTimes = [
    { label: "9:00 AM", hour: 9, minute: 0, period: "AM" },
    { label: "10:00 AM", hour: 10, minute: 0, period: "AM" },
    { label: "11:00 AM", hour: 11, minute: 0, period: "AM" },
    { label: "2:00 PM", hour: 2, minute: 0, period: "PM" },
    { label: "3:00 PM", hour: 3, minute: 0, period: "PM" },
    { label: "4:00 PM", hour: 4, minute: 0, period: "PM" },
  ]

  const selectQuickTime = (time) => {
    setSelectedHour(time.hour)
    setSelectedMinute(time.minute)
    setSelectedPeriod(time.period)
    const time24 = formatTime24(time.hour, time.minute, time.period)
    setFormData((prev) => ({
      ...prev,
      availableTime: time24,
    }))
    setIsTimeOpen(false)
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
    setAttachments((prev) => prev.filter((_, i) => i !== index))
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

    // Prevent double submission
    if (isSubmitting) {
      console.log("Form is already submitting, preventing double submission")
      return
    }

    console.log("Starting form submission...")

    // Validate all required fields for final submission
    const allRequiredFields = [
      "fullName",
      "email",
      "projectType",
      "budget",
      "timeline",
      "projectDescription",
      "contactMethod",
    ]
    const missingFields = allRequiredFields.filter((field) => {
      const value = formData[field]
      return !value || value.toString().trim() === ""
    })

    if (missingFields.length > 0) {
      const fieldLabels = {
        fullName: "Full Name",
        email: "Email Address",
        projectType: "Project Type",
        budget: "Budget Range",
        timeline: "Timeline",
        projectDescription: "Project Description",
        contactMethod: "Contact Method",
      }
      const missingFieldNames = missingFields.map((field) => fieldLabels[field]).join(", ")
      setSubmitError(`Please fill in the following required fields: ${missingFieldNames}`)
      return
    }

    setIsSubmitting(true)
    setSubmitError("")
    setUploadProgress(0)

    try {
      console.log("Preparing submission data...")

      const submissionData = {
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        company: formData.company?.trim() || null,
        project_type: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        project_description: formData.projectDescription.trim(),
        contact_method: formData.contactMethod,
        available_time: formData.availableTime || null,
        available_date: formData.availableDate || null,
        hear_about: formData.hearAbout || null,
        status: "new",
        priority: "medium",
        created_at: new Date().toISOString(),
      }

      console.log("Submission data prepared:", submissionData)

      if (attachments.length > 0) {
        console.log(`Uploading ${attachments.length} files...`)
        setUploadProgress(25)
      }

      // Initialize API
      if (!supabase) {
        throw new Error("Supabase client not initialized")
      }

      const api = hireMeAPI(supabase)
      if (!api || typeof api.submit !== "function") {
        throw new Error("API not properly initialized")
      }

      console.log("Submitting to API...")
      await api.submit(submissionData, attachments)

      console.log("Submission successful!")
      setUploadProgress(100)
      setIsSubmitting(false)
      setShowSuccessModal(true)

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
      setSelectedDate(null)
      setCurrentStep(1)

      setTimeout(() => {
        setShowSuccessModal(false)
        setShowTickAnimation(false)
      }, 4000)
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitError(`Failed to submit form: ${error.message || "Please try again."}`)
      setIsSubmitting(false)
      setUploadProgress(0)
    }
  }

  const closeModal = () => {
    setShowSuccessModal(false)
    setShowTickAnimation(false)
  }

  const nextStep = () => {
    if (currentStep < 4 && isFormValid()) {
      setCurrentStep((prev) => prev + 1)
    } else if (!isFormValid()) {
      const missing = getMissingFields()
      setSubmitError(`Please fill in the following required fields: ${missing.join(", ")}`)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      setSubmitError("") // Clear any error when going back
    }
  }

  const dismissError = () => {
    setSubmitError("")
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

  const days = getDaysInMonth(currentMonth)
  const stepTitles = ["Personal Info", "Project Details", "Communication", "Review & Submit"]

  const isStepValid = (step) => {
    const requiredFields = {
      1: ["fullName", "email"],
      2: ["projectType", "budget", "timeline", "projectDescription"],
      3: ["contactMethod"],
      4: [],
    }

    const currentRequiredFields = requiredFields[step] || []

    return currentRequiredFields.every((field) => {
      const value = formData[field]
      return value && value.toString().trim() !== ""
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      <InteractiveBackground />
      <Navbar />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/3 to-purple-500/3 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fade-in" onClick={closeModal} />
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 rounded-3xl p-8 max-w-md w-full text-center animate-scale-in shadow-2xl">
            <div className="mb-6">
              <div
                className={`w-20 h-20 mx-auto rounded-full border-4 border-green-500 flex items-center justify-center ${showTickAnimation ? "animate-tick-circle" : ""}`}
              >
                <svg
                  className={`w-10 h-10 text-green-500 ${showTickAnimation ? "animate-tick-draw" : "opacity-0"}`}
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
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">🎉 Request Sent Successfully!</h3>
              <p className="text-gray-300">Thanks for reaching out! I'll get back to you within 24-48 hours.</p>
              {attachments.length > 0 && (
                <p className="text-sm text-blue-400">
                  📎 {attachments.length} file{attachments.length > 1 ? "s" : ""} uploaded
                </p>
              )}
              <p className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Let's build something amazing together! ✨
              </p>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <nav className="mb-8">
            <div className="flex items-center justify-center space-x-3 text-sm">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                Home
              </Link>
              <span className="text-gray-600">→</span>
              <span className="text-blue-400 font-medium">Hire Me</span>
            </div>
          </nav>
          <div className="mb-8">
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-green-500/10 backdrop-blur-sm rounded-full border border-green-500/30">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">Available for New Projects</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Let's Create Something
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Extraordinary
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your vision to life? Let's discuss your project and create something amazing together.
          </p>
        </div>
      </section>

      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            {stepTitles.map((title, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    currentStep > index + 1
                      ? "bg-green-500 text-white"
                      : currentStep === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {currentStep > index + 1 ? "✓" : index + 1}
                </div>
                {index < stepTitles.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 rounded transition-all duration-300 ${
                      currentStep > index + 1 ? "bg-green-500" : "bg-gray-700"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-white">{stepTitles[currentStep - 1]}</h2>
            <p className="text-gray-400 text-sm">
              Step {currentStep} of {stepTitles.length}
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {submitError && (
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <p className="text-red-400 font-medium">⚠️ {submitError}</p>
              <button
                onClick={dismissError}
                className="text-red-400 hover:text-red-300 transition-colors duration-300 ml-4"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {isSubmitting && uploadProgress > 0 && (
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 font-medium">📤 Uploading files...</span>
                  <span className="text-blue-400 font-bold">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300 shadow-lg"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Form */}
      <section className="pb-20 relative">
        <div className="max-w-4xl mx-auto px-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl animate-slide-in">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">👤</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Personal Information</h3>
                    <p className="text-gray-400">Tell us about yourself</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
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
                      className="w-full bg-black/40 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
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
                      className="w-full bg-black/40 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <label className="block text-gray-300 font-medium">
                    Company / Organization <span className="text-gray-500">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                    placeholder="Your company or organization name"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Project Details */}
            {currentStep === 2 && (
              <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl animate-slide-in">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Project Details</h3>
                    <p className="text-gray-400">Tell us about your project</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <label className="block text-gray-300 font-medium">
                      Project Type <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/40 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
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
                  <div className="space-y-3">
                    <label className="block text-gray-300 font-medium">
                      Budget Range <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/40 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
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
                <div className="mb-6 space-y-3">
                  <label className="block text-gray-300 font-medium">
                    Timeline <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/40 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
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
                <div className="space-y-3">
                  <label className="block text-gray-300 font-medium">
                    Project Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full bg-black/40 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 resize-none"
                    placeholder="Describe your project vision, goals, and specific requirements..."
                  ></textarea>
                </div>

                {/* File Attachments */}
                <div className="mt-6 space-y-3">
                  <label className="block text-gray-300 font-medium">
                    Project Files <span className="text-gray-500">(Optional - Max 10MB per file)</span>
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-600/50 rounded-xl p-6 text-center hover:border-purple-400/50 hover:bg-purple-500/5 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">📎</div>
                    <p className="text-gray-400 mb-1 font-medium">Drop files here or click to upload</p>
                    <p className="text-gray-500 text-sm">PDF, DOC, Images, ZIP files supported</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.webp,.zip"
                  />
                  {attachments.length > 0 && (
                    <div className="space-y-2 mt-4">
                      <h4 className="text-gray-300 font-medium">📁 Attached Files:</h4>
                      {attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-black/40 rounded-lg px-4 py-3 border border-gray-600/50"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                              <span className="text-purple-400 text-xs font-bold">
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
            )}

            {/* Step 3: Communication Preferences */}
            {currentStep === 3 && (
              <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl animate-slide-in">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">💬</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Communication Preferences</h3>
                    <p className="text-gray-400">How would you like to connect?</p>
                  </div>
                </div>

                {/* Contact Method */}
                <div className="mb-8 space-y-4">
                  <label className="block text-gray-300 font-medium">
                    Preferred Contact Method <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { method: "Email", icon: "📧", desc: "Professional communication" },
                      { method: "WhatsApp", icon: "💬", desc: "Quick messaging" },
                      { method: "Zoom Call", icon: "📹", desc: "Face-to-face discussion" },
                    ].map(({ method, icon, desc }) => (
                      <label key={method} className="relative cursor-pointer group">
                        <input
                          type="radio"
                          name="contactMethod"
                          value={method}
                          checked={formData.contactMethod === method}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-center group-hover:scale-105 ${
                            formData.contactMethod === method
                              ? "border-green-400 bg-green-500/10 text-white shadow-lg"
                              : "border-gray-600/50 bg-black/20 text-gray-400 hover:border-gray-500 hover:text-gray-300"
                          }`}
                        >
                          <div className="text-2xl mb-2">{icon}</div>
                          <span className="font-medium block">{method}</span>
                          <span className="text-xs text-gray-500 mt-1 block">{desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Available Date and Time */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Calendar Picker */}
                  <div className="space-y-3">
                    <label className="block text-gray-300 font-medium">
                      Available Date <span className="text-gray-500">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div
                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                        className="w-full bg-black/40 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 cursor-pointer flex items-center justify-between"
                      >
                        <span className={selectedDate ? "text-white" : "text-gray-500"}>
                          {formatDisplayDate(selectedDate)}
                        </span>
                        <div
                          className={`transform transition-transform duration-200 ${isCalendarOpen ? "rotate-180" : ""}`}
                        >
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      {/* Calendar Dropdown */}
                      {isCalendarOpen && (
                        <>
                          <div className="fixed inset-0 z-[99998]" onClick={() => setIsCalendarOpen(false)} />
                          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 border border-gray-700 rounded-xl p-4 shadow-2xl z-[99999] backdrop-blur-xl">
                            <div className="flex items-center justify-between mb-4">
                              <button
                                type="button"
                                onClick={() => navigateMonth(-1)}
                                className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                              >
                                <svg
                                  className="w-4 h-4 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                  />
                                </svg>
                              </button>
                              <h3 className="text-lg font-semibold text-white">
                                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                              </h3>
                              <button
                                type="button"
                                onClick={() => navigateMonth(1)}
                                className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                              >
                                <svg
                                  className="w-4 h-4 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            </div>
                            <div className="grid grid-cols-7 gap-1 mb-2">
                              {daysOfWeek.map((day) => (
                                <div key={day} className="text-center text-xs font-medium text-gray-400 py-2">
                                  {day}
                                </div>
                              ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                              {days.map((date, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => date && !isPastDate(date) && handleDateSelect(date)}
                                  disabled={!date || isPastDate(date)}
                                  className={`h-8 w-8 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    !date ? "invisible" : ""
                                  } ${
                                    isPastDate(date)
                                      ? "text-gray-600 cursor-not-allowed"
                                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                  } ${isToday(date) ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : ""} ${
                                    isSameDay(date, selectedDate) ? "bg-green-500 text-white font-bold" : ""
                                  }`}
                                >
                                  {date?.getDate()}
                                </button>
                              ))}
                            </div>
                            <div className="flex gap-2 mt-4 pt-3 border-t border-gray-700">
                              <button
                                type="button"
                                onClick={() => handleDateSelect(new Date())}
                                className="flex-1 py-2 px-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all duration-200 text-sm font-medium"
                              >
                                Today
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const tomorrow = new Date()
                                  tomorrow.setDate(tomorrow.getDate() + 1)
                                  handleDateSelect(tomorrow)
                                }}
                                className="flex-1 py-2 px-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all duration-200 text-sm font-medium"
                              >
                                Tomorrow
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Time Picker */}
                  <div className="space-y-3">
                    <label className="block text-gray-300 font-medium">
                      Available Time <span className="text-gray-500">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div
                        onClick={() => setIsTimeOpen(!isTimeOpen)}
                        className="w-full bg-black/40 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 cursor-pointer flex items-center justify-between"
                      >
                        <span className={formData.availableTime ? "text-white" : "text-gray-500"}>
                          {getDisplayTime()}
                        </span>
                        <div
                          className={`transform transition-transform duration-200 ${isTimeOpen ? "rotate-180" : ""}`}
                        >
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Time Picker Dropdown */}
                      {isTimeOpen && (
                        <>
                          <div className="fixed inset-0 z-[99998]" onClick={() => setIsTimeOpen(false)} />
                          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 border border-gray-700 rounded-xl p-4 shadow-2xl z-[99999] backdrop-blur-xl">
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-400 mb-3">⚡ Quick Select</h4>
                              <div className="grid grid-cols-3 gap-2">
                                {quickTimes.map((time, index) => (
                                  <button
                                    key={index}
                                    type="button"
                                    onClick={() => selectQuickTime(time)}
                                    className="py-2 px-3 bg-gray-800 hover:bg-green-600 text-gray-300 hover:text-white rounded-lg transition-all duration-200 text-sm font-medium"
                                  >
                                    {time.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="border-t border-gray-700 pt-4">
                              <h4 className="text-sm font-medium text-gray-400 mb-3">🕐 Custom Time</h4>
                              <div className="flex items-center justify-center space-x-3 mb-4">
                                <div className="text-center">
                                  <label className="block text-xs text-gray-500 mb-1">Hour</label>
                                  <select
                                    value={selectedHour}
                                    onChange={(e) => setSelectedHour(Number.parseInt(e.target.value, 10))}
                                    className="bg-gray-800 border border-gray-600 rounded-lg px-2 py-1 text-white text-center focus:outline-none focus:border-green-400"
                                  >
                                    {hours.map((hour) => (
                                      <option key={hour} value={hour}>
                                        {hour}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="text-white text-xl font-bold mt-4">:</div>
                                <div className="text-center">
                                  <label className="block text-xs text-gray-500 mb-1">Min</label>
                                  <select
                                    value={selectedMinute}
                                    onChange={(e) => setSelectedMinute(Number.parseInt(e.target.value, 10))}
                                    className="bg-gray-800 border border-gray-600 rounded-lg px-2 py-1 text-white text-center focus:outline-none focus:border-green-400"
                                  >
                                    {minutes.map((minute) => (
                                      <option key={minute} value={minute}>
                                        {minute.toString().padStart(2, "0")}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="text-center">
                                  <label className="block text-xs text-gray-500 mb-1">Period</label>
                                  <div className="flex bg-gray-800 rounded-lg overflow-hidden">
                                    <button
                                      type="button"
                                      onClick={() => setSelectedPeriod("AM")}
                                      className={`px-3 py-1 text-sm font-medium transition-all duration-200 ${
                                        selectedPeriod === "AM"
                                          ? "bg-green-500 text-white"
                                          : "text-gray-300 hover:text-white hover:bg-gray-700"
                                      }`}
                                    >
                                      AM
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setSelectedPeriod("PM")}
                                      className={`px-3 py-1 text-sm font-medium transition-all duration-200 ${
                                        selectedPeriod === "PM"
                                          ? "bg-green-500 text-white"
                                          : "text-gray-300 hover:text-white hover:bg-gray-700"
                                      }`}
                                    >
                                      PM
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="mb-3">
                                  <span className="text-gray-400 text-sm">Selected: </span>
                                  <span className="text-white font-semibold">
                                    {formatTime(selectedHour, selectedMinute, selectedPeriod)}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={handleTimeSelect}
                                  className="w-full py-2 bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold rounded-lg hover:from-green-600 hover:to-cyan-600 transition-all duration-300"
                                >
                                  Confirm Time
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* How did you hear about me */}
                <div className="space-y-3">
                  <label className="block text-gray-300 font-medium">
                    How did you hear about me? <span className="text-gray-500">(Optional)</span>
                  </label>
                  <select
                    name="hearAbout"
                    value={formData.hearAbout}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
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
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl animate-slide-in">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">📋</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Review & Submit</h3>
                    <p className="text-gray-400">Please review your information</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {/* Personal Info Review */}
                  <div className="bg-black/20 rounded-xl p-4 border border-gray-700/30">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <span className="mr-2">👤</span> Personal Information
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Name:</span>{" "}
                        <span className="text-white font-medium">{formData.fullName}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Email:</span>{" "}
                        <span className="text-white font-medium">{formData.email}</span>
                      </div>
                      {formData.company && (
                        <div>
                          <span className="text-gray-400">Company:</span>{" "}
                          <span className="text-white font-medium">{formData.company}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Project Details Review */}
                  <div className="bg-black/20 rounded-xl p-4 border border-gray-700/30">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <span className="mr-2">🚀</span> Project Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-400">Type:</span>{" "}
                        <span className="text-white font-medium">{formData.projectType}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Budget:</span>{" "}
                        <span className="text-white font-medium">{formData.budget}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Timeline:</span>{" "}
                        <span className="text-white font-medium">{formData.timeline}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Description:</span>{" "}
                        <span className="text-white font-medium">{formData.projectDescription}</span>
                      </div>
                      {attachments.length > 0 && (
                        <div>
                          <span className="text-gray-400">Files:</span>{" "}
                          <span className="text-white font-medium">{attachments.length} file(s) attached</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Communication Review */}
                  <div className="bg-black/20 rounded-xl p-4 border border-gray-700/30">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <span className="mr-2">💬</span> Communication Preferences
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-400">Contact Method:</span>{" "}
                        <span className="text-white font-medium">{formData.contactMethod}</span>
                      </div>
                      {formData.availableDate && (
                        <div>
                          <span className="text-gray-400">Available Date:</span>{" "}
                          <span className="text-white font-medium">{formatDisplayDate(selectedDate)}</span>
                        </div>
                      )}
                      {formData.availableTime && (
                        <div>
                          <span className="text-gray-400">Available Time:</span>{" "}
                          <span className="text-white font-medium">{getDisplayTime()}</span>
                        </div>
                      )}
                      {formData.hearAbout && (
                        <div>
                          <span className="text-gray-400">Heard About:</span>{" "}
                          <span className="text-white font-medium">{formData.hearAbout}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Privacy Notice */}
                <div className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">🔒</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2 text-lg">Privacy & Security</h4>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        Your information is completely secure and confidential. I respect your privacy and will never
                        share your data with third parties. All project details and files are stored securely and used
                        solely for project communication.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  currentStep === 1
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-white hover:bg-gray-600 hover:scale-105"
                }`}
              >
                ← Previous
              </button>
              <div className="text-center">
                <span className="text-gray-400 text-sm">
                  Step {currentStep} of {stepTitles.length}
                </span>
              </div>
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid(currentStep)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isStepValid(currentStep)
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:scale-105 shadow-lg"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid()}
                  className={`px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
                    isSubmitting || !isFormValid()
                      ? "bg-gray-800 text-gray-500 cursor-not-allowed animate-pulse"
                      : "bg-gradient-to-r from-green-500 to-cyan-500 text-white hover:from-green-600 hover:to-cyan-600 hover:scale-105 shadow-lg"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <span>🚀</span>
                      <span>Send Request</span>
                    </span>
                  )}
                </button>
              )}
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
             transform: scale(0.9) translateY(20px);
           }
          to {
             opacity: 1;
             transform: scale(1) translateY(0);
           }
        }
        @keyframes slide-in {
          from {
             opacity: 0;
             transform: translateX(20px);
           }
          to {
             opacity: 1;
             transform: translateX(0);
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
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.4s ease-out forwards;
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
        }
        .animate-tick-circle {
          animation: tick-circle 0.6s ease-out forwards;
        }
        .animate-tick-draw {
          animation: tick-draw 0.8s ease-out 0.3s forwards;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
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

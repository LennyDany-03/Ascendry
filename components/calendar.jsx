"use client"

import { useState } from "react"

const Calendar = ({ selectedDate, onDateSelect, minDate = null }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)

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

  const formatDate = (date) => {
    if (!date) return "Select date"
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const isDateDisabled = (date) => {
    if (!date || !minDate) return false
    return date < minDate
  }

  const isToday = (date) => {
    if (!date) return false
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date) => {
    if (!date || !selectedDate) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  const handleDateClick = (date) => {
    if (isDateDisabled(date)) return
    onDateSelect(date)
    setIsOpen(false)
  }

  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev)
      newMonth.setMonth(prev.getMonth() + direction)
      return newMonth
    })
  }

  const goToToday = () => {
    setCurrentMonth(new Date())
  }

  const days = getDaysInMonth(currentMonth)

  return (
    <div className="relative">
      {/* Date Input Display */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-black/60 border border-gray-600/60 rounded-xl md:rounded-2xl px-6 md:px-8 py-4 md:py-6 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm cursor-pointer flex items-center justify-between text-lg md:text-xl"
      >
        <span className={selectedDate ? "text-white" : "text-gray-500"}>{formatDate(selectedDate)}</span>
        <svg
          className={`w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Calendar Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-[500000]" onClick={() => setIsOpen(false)} />

          {/* Calendar */}
          <div className="absolute top-full left-0 right-0 mt-2 md:mt-3 bg-gray-900/98 border border-gray-700/80 rounded-2xl md:rounded-3xl shadow-2xl z-[500001] p-6 md:p-8 backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <button
                type="button"
                onClick={() => navigateMonth(-1)}
                className="p-2 md:p-3 hover:bg-gray-800 rounded-lg md:rounded-xl transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="text-center">
                <h3 className="text-white font-bold text-lg md:text-xl">
                  {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => navigateMonth(1)}
                className="p-2 md:p-3 hover:bg-gray-800 rounded-lg md:rounded-xl transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Today Button */}
            <div className="mb-4 md:mb-6 text-center">
              <button
                type="button"
                onClick={goToToday}
                className="px-4 md:px-6 py-2 md:py-3 bg-blue-500/20 text-blue-400 rounded-lg md:rounded-xl hover:bg-blue-500/30 transition-colors duration-200 font-semibold text-sm md:text-base"
              >
                Today
              </button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 md:gap-2 mb-3 md:mb-4">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center text-gray-400 font-semibold py-2 md:py-3 text-xs md:text-sm">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {days.map((date, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => date && handleDateClick(date)}
                  disabled={!date || isDateDisabled(date)}
                  className={`
                    h-10 w-10 md:h-12 md:w-12 rounded-lg md:rounded-xl font-semibold transition-all duration-200 text-sm md:text-base
                    ${!date ? "invisible" : ""}
                    ${
                      isDateDisabled(date)
                        ? "text-gray-600 cursor-not-allowed"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                    }
                    ${isSelected(date) ? "bg-blue-500 text-white font-bold shadow-lg" : ""}
                    ${
                      isToday(date) && !isSelected(date) ? "bg-blue-500/20 text-blue-400 border border-blue-500/50" : ""
                    }
                  `}
                >
                  {date?.getDate()}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Calendar

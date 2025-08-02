"use client"

import { useState, useEffect } from "react"

const TimePicker = ({ selectedTime, onTimeSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hours, setHours] = useState(12)
  const [minutes, setMinutes] = useState(0)
  const [period, setPeriod] = useState("AM")

  // Parse selectedTime when it changes
  useEffect(() => {
    if (selectedTime) {
      const [time] = selectedTime.split(" ")
      const [h, m] = time.split(":").map(Number)

      if (h === 0) {
        setHours(12)
        setPeriod("AM")
      } else if (h < 12) {
        setHours(h)
        setPeriod("AM")
      } else if (h === 12) {
        setHours(12)
        setPeriod("PM")
      } else {
        setHours(h - 12)
        setPeriod("PM")
      }

      setMinutes(m)
    }
  }, [selectedTime])

  const formatTime = (h, m, p) => {
    const formattedHour = h.toString().padStart(2, "0")
    const formattedMinute = m.toString().padStart(2, "0")
    return `${formattedHour}:${formattedMinute} ${p}`
  }

  const formatTimeFor24Hour = (h, m, p) => {
    let hour24 = h
    if (p === "AM" && h === 12) hour24 = 0
    if (p === "PM" && h !== 12) hour24 = h + 12
    return `${hour24.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
  }

  const handleTimeSelect = () => {
    const time24 = formatTimeFor24Hour(hours, minutes, period)
    onTimeSelect(time24)
    setIsOpen(false)
  }

  const generateHours = () => {
    return Array.from({ length: 12 }, (_, i) => i + 1)
  }

  const generateMinutes = () => {
    return Array.from({ length: 12 }, (_, i) => i * 5)
  }

  const displayTime = selectedTime ? formatTime(hours, minutes, period) : "Select time"

  return (
    <div className="relative">
      {/* Time Input Display */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-black/40 border border-gray-600/50 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300 backdrop-blur-sm cursor-pointer flex items-center justify-between"
      >
        <span className={selectedTime ? "text-white" : "text-gray-500"}>{displayTime}</span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Time Picker Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Time Picker */}
          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl z-50 backdrop-blur-xl">
            {/* Header */}
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-white font-semibold text-lg text-center">Select Time</h3>
            </div>

            {/* Clock Display */}
            <div className="p-6 text-center">
              <div className="text-4xl font-bold text-white mb-4 font-mono">{formatTime(hours, minutes, period)}</div>
            </div>

            {/* Time Controls */}
            <div className="p-6 space-y-6">
              {/* Hours */}
              <div>
                <label className="block text-gray-300 font-medium mb-3">Hour</label>
                <div className="grid grid-cols-6 gap-2">
                  {generateHours().map((hour) => (
                    <button
                      key={hour}
                      type="button"
                      onClick={() => setHours(hour)}
                      className={`
                        h-10 rounded-xl text-sm font-medium transition-all duration-200
                        ${
                          hours === hour
                            ? "bg-white text-black font-bold"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                        }
                      `}
                    >
                      {hour}
                    </button>
                  ))}
                </div>
              </div>

              {/* Minutes */}
              <div>
                <label className="block text-gray-300 font-medium mb-3">Minute</label>
                <div className="grid grid-cols-6 gap-2">
                  {generateMinutes().map((minute) => (
                    <button
                      key={minute}
                      type="button"
                      onClick={() => setMinutes(minute)}
                      className={`
                        h-10 rounded-xl text-sm font-medium transition-all duration-200
                        ${
                          minutes === minute
                            ? "bg-white text-black font-bold"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                        }
                      `}
                    >
                      {minute.toString().padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>

              {/* AM/PM */}
              <div>
                <label className="block text-gray-300 font-medium mb-3">Period</label>
                <div className="grid grid-cols-2 gap-2">
                  {["AM", "PM"].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPeriod(p)}
                      className={`
                        h-12 rounded-xl text-lg font-medium transition-all duration-200
                        ${
                          period === p
                            ? "bg-white text-black font-bold"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                        }
                      `}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Time Options */}
              <div>
                <label className="block text-gray-300 font-medium mb-3">Quick Select</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "9:00 AM", h: 9, m: 0, p: "AM" },
                    { label: "12:00 PM", h: 12, m: 0, p: "PM" },
                    { label: "2:00 PM", h: 2, m: 0, p: "PM" },
                    { label: "4:00 PM", h: 4, m: 0, p: "PM" },
                    { label: "6:00 PM", h: 6, m: 0, p: "PM" },
                    { label: "8:00 PM", h: 8, m: 0, p: "PM" },
                  ].map((time) => (
                    <button
                      key={time.label}
                      type="button"
                      onClick={() => {
                        setHours(time.h)
                        setMinutes(time.m)
                        setPeriod(time.p)
                      }}
                      className="h-10 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-colors duration-200 text-sm font-medium"
                    >
                      {time.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-700 flex space-x-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-3 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleTimeSelect}
                className="flex-1 px-4 py-3 bg-white text-black rounded-xl hover:bg-gray-200 transition-colors duration-200 font-bold"
              >
                Select Time
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TimePicker

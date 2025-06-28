"use client"

import { useState, useEffect } from "react"
import InteractiveBackground from "../../components/interactive-background"
import { Mail, ArrowRight, Clock, CheckCircle, Wrench, Hammer } from "lucide-react"

const UnderConstructionPage = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Countdown timer (30 days from now)
  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 30)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })

      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubscribed(true)
      setIsSubmitting(false)
      setEmail("")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden mt-12">
      <InteractiveBackground />

      {/* Simple floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-bounce">
          <Wrench className="w-6 h-6 text-blue-500/20" />
        </div>
        <div className="absolute top-32 right-20 animate-pulse delay-1000">
          <Hammer className="w-5 h-5 text-purple-500/20" />
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center p-6">
        <div className="max-w-4xl w-full text-center">
          {/* Logo/Brand */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200">
              ASCENDRY
            </h1>
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-20"></div>
              <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
                <span className="text-blue-300 font-medium text-sm">UNDER CONSTRUCTION</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-20"></div>
            </div>
          </div>

          {/* Main Message */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-white">We're Building</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Something Amazing
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Our new platform is coming soon. Get ready for an extraordinary digital experience.
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-medium text-sm">Launch Countdown</span>
            </div>

            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Minutes" },
                { value: timeLeft.seconds, label: "Seconds" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:scale-105 transition-all duration-300"
                >
                  <div className="text-3xl md:text-4xl font-black text-white mb-2">
                    {item.value.toString().padStart(2, "0")}
                  </div>
                  <div className="text-gray-400 text-sm font-medium uppercase tracking-wide">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Subscription */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

              <div className="relative z-10">
                {!isSubscribed ? (
                  <>
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                        <Mail className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-white">Get Notified When We Launch</h3>
                      <p className="text-gray-400 leading-relaxed">
                        Be the first to know when we go live. No spam, just updates.
                      </p>
                    </div>

                    <form onSubmit={handleSubscribe} className="space-y-4">
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          required
                          className="w-full bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        />
                        <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 text-white px-8 py-4 font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center justify-center space-x-2">
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Subscribing...</span>
                            </>
                          ) : (
                            <>
                              <span>Notify Me</span>
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </span>
                      </button>
                    </form>

                    <p className="text-gray-500 text-sm mt-4">We respect your privacy. Unsubscribe at any time.</p>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Thank You!</h3>
                    <p className="text-gray-300">You'll be notified as soon as we launch.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">© 2024 Ascendry. Coming Soon.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnderConstructionPage

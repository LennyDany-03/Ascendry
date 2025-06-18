"use client"

import { useEffect, useRef } from "react"

const InteractiveBackground = () => {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.1
        this.color = Math.random() > 0.7 ? "#1e40af" : "#ffffff"
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Mouse interaction
        const dx = mouseRef.current.x - this.x
        const dy = mouseRef.current.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const force = (100 - distance) / 100
          this.x -= dx * force * 0.01
          this.y -= dy * force * 0.01
        }

        // Boundary check
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1

        // Keep particles in bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x))
        this.y = Math.max(0, Math.min(canvas.height, this.y))
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push(new Particle())
      }
    }

    // Draw connections
    const drawConnections = () => {
      if (!ctx) return
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x
          const dy = particlesRef.current[i].y - particlesRef.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.save()
            ctx.globalAlpha = ((150 - distance) / 150) * 0.1
            ctx.strokeStyle = "#ffffff"
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y)
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw connections
      drawConnections()

      requestAnimationFrame(animate)
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    // Initialize and start
    initParticles()
    animate()
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

export default InteractiveBackground

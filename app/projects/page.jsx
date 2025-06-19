"use client"

import Navbar from "../../components/navbar.jsx"
import Footer from "../../components/footer.jsx"
import InteractiveBackground from "../../components/interactive-background"
import ProjectCard from "../../components/project-card.jsx"
import Link from "next/link"

const ProjectsPage = () => {
  const projects = [
    {
      id: "club-sphere",
      title: "Club Sphere",
      description:
        "A comprehensive full-stack college club management system featuring event registration, admin dashboard, student portal, and real-time notifications. Built to streamline club activities and enhance student engagement.",
      techStack: ["React", "Supabase", "Razorpay", "Tailwind CSS", "Node.js"],
      githubUrl: "#",
      liveUrl: "#",
      detailsUrl: "/projects/club-sphere",
    },
    {
      id: "exodus-music-ministry",
      title: "Exodus Music Ministry",
      description:
        "Official website for a church music ministry featuring event listings, music streaming, member profiles, and donation integration. Designed to connect the community and showcase musical talents.",
      techStack: ["Next.js", "Firebase", "Stripe", "Framer Motion", "Vercel"],
      githubUrl: "#",
      liveUrl: "#",
      detailsUrl: "/projects/exodus-music-ministry",
    },
    {
      id: "novapay",
      title: "NovaPay",
      description:
        "Advanced UPI budget tracker and expense analyzer with AI-powered insights, category-wise spending analysis, bill reminders, and financial goal tracking. Helps users manage their finances effectively.",
      techStack: ["React Native", "Firebase", "UPI API", "Chart.js", "Redux"],
      githubUrl: "#",
      liveUrl: "#",
      detailsUrl: "/projects/novapay",
    },
    {
      id: "hospital-chatbot",
      title: "Hospital ChatBot",
      description:
        "AI-powered health consultation chatbot supporting both Tamil and English languages. Provides preliminary health assessments, appointment booking, and medical information with natural language processing.",
      techStack: ["Python", "TensorFlow", "Flask", "NLP", "MongoDB", "React"],
      githubUrl: "#",
      liveUrl: "#",
      detailsUrl: "/projects/hospital-chatbot",
    },
    {
      id: "ecommerce-platform",
      title: "E-Commerce Platform",
      description:
        "Modern e-commerce solution with advanced product filtering, secure payment processing, inventory management, and analytics dashboard. Built for scalability and performance.",
      techStack: ["Next.js", "Stripe", "PostgreSQL", "Redis", "AWS"],
      githubUrl: "#",
      liveUrl: "#",
      detailsUrl: "/projects/ecommerce-platform",
    },
    {
      id: "task-management-app",
      title: "Task Management App",
      description:
        "Collaborative task management application with real-time updates, team collaboration features, project tracking, and productivity analytics. Perfect for remote teams.",
      techStack: ["Vue.js", "Socket.io", "Express", "MongoDB", "JWT"],
      githubUrl: "#",
      liveUrl: "#",
      detailsUrl: "/projects/task-management-app",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative">
      <InteractiveBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        {/* Geometric Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-white/10 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/5 rotate-12 animate-pulse"></div>
        <div className="absolute bottom-10 left-1/4 w-12 h-12 border border-blue-900/40 rounded-full animate-bounce"></div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 rounded-full border border-gray-800 mb-8">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300 font-medium">Portfolio Showcase</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 relative">
            <span className="text-white">PROJECTS</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Recent work and case studies showcasing real-world solutions and technical expertise.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { number: "20+", label: "Projects Completed" },
              { number: "15+", label: "Technologies Used" },
              { number: "100%", label: "Client Satisfaction" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-black text-blue-500 mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-950 relative">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(255,255,255,0.02)_50%,transparent_51%)] bg-[size:20px_20px]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black relative">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,64,175,0.1),transparent_70%)]"></div>

            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-6 text-white">Ready to Build Something Amazing?</h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Want to work with me on a similar project? Let's discuss your ideas and bring them to life.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="#contact"
                  className="group bg-white hover:bg-gray-200 text-black px-10 py-4 font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                >
                  <span className="relative z-10">Get In Touch</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Link>

                <Link
                  href="/services"
                  className="border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 font-bold text-lg transition-all duration-300 hover:scale-105"
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ProjectsPage

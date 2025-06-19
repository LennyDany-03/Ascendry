
import Navbar from "../components/navbar.jsx"
import InteractiveBackground from "../components/interactive-background"
import Footer from "../components/footer.jsx"

const Page = () => {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <InteractiveBackground />
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="pt-32 min-h-screen flex items-center justify-center relative">
        {/* Geometric Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-white/10 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/5 rotate-12 animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 border border-blue-900/40 rounded-full animate-bounce"></div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 rounded-full border border-gray-800 mb-8">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300 font-medium">Welcome to Ascendry</span>
            </div>
          </div>

          <h1 className="text-7xl md:text-9xl font-black mb-8 relative">
            <span className="text-white">BUILD.</span>
            <br />
            <span className="text-gray-600">CODE.</span>
            <br />
            <span className="text-blue-500">ASCEND.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Professional development services that transform ideas into powerful digital solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group bg-white hover:bg-gray-200 text-black px-10 py-4 font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>

            <button className="border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 font-bold text-lg transition-all duration-300 hover:scale-105">
              View Projects
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-950 relative">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(255,255,255,0.02)_50%,transparent_51%)] bg-[size:20px_20px]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 text-white">SERVICES</h2>
            <p className="text-xl text-gray-400">What I can help you with</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Web Development", desc: "Modern, responsive websites", icon: "🌐" },
              { title: "Mobile Apps", desc: "iOS and Android applications", icon: "📱" },
              { title: "Backend Systems", desc: "Scalable server solutions", icon: "⚙️" },
              { title: "UI/UX Design", desc: "Beautiful user experiences", icon: "🎨" },
              { title: "E-commerce", desc: "Online store solutions", icon: "🛒" },
              { title: "Consulting", desc: "Technical guidance", icon: "💡" },
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-black p-8 border border-gray-800 hover:border-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white via-blue-500 to-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                <div className="text-4xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 text-white">PROJECTS</h2>
            <p className="text-xl text-gray-400">Recent work and case studies</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((project) => (
              <div
                key={project}
                className="group bg-gray-950 border border-gray-800 hover:border-white hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
              >
                <div className="h-48 bg-gradient-to-br from-gray-900 to-gray-800 group-hover:from-gray-800 group-hover:to-gray-700 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.05)_50%,transparent_60%)] bg-[size:30px_30px] animate-pulse"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
                    Project {project}
                  </h3>
                  <p className="text-gray-400 mb-4 group-hover:text-gray-200 transition-colors duration-300">
                    Description of the project and technologies used in development.
                  </p>
                  <button className="text-white hover:text-blue-400 font-semibold transition-colors duration-300 flex items-center space-x-2">
                    <span>View Details</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Section */}
      <section id="store" className="py-20 bg-white text-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,64,175,0.1),transparent_70%)]"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl font-black mb-6">STORE</h2>
          <p className="text-xl text-gray-700 mb-8">Digital products and resources</p>
          <button className="bg-black text-white hover:bg-gray-800 px-10 py-4 font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            Browse Products
          </button>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-gray-950 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black mb-6 text-white">BLOG</h2>
          <p className="text-xl text-gray-400 mb-8">Thoughts on development and technology</p>
          <button className="border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 font-bold text-lg transition-all duration-300 hover:scale-105">
            Read Articles
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black mb-6 text-white">CONTACT</h2>
          <p className="text-xl text-gray-400 mb-8">Let's work together on your next project</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white hover:bg-gray-200 text-black px-10 py-4 font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              Get In Touch
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 font-bold text-lg transition-all duration-300 hover:scale-105">
              Download Resume
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Page

"use client"

import { motion } from "framer-motion"
import { ProjectCard } from "./project-card"
import { CertificationCard } from "./certification-card"
import { Github, Linkedin, Mail } from "lucide-react"

const projects = [
  {
    title: "MacroAnalyzer",
    description:
      "An AI-powered financial intelligence platform that aggregates macroeconomic news, quantifies sentiment using natural language processing, and visualizes correlations with historical market data to derive predictive insights for market performance.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Python", "FastAPI", "Supabase", "FinBERT", "D3.js"],
    demoUrl: "#",
    codeUrl: "https://github.com/t-goel/MacroAnalyzer",
  },
  {
    title: "MarketDashboard",
    description: "A financial analytics tool that visualizes historical stock trends with moving average overlays, aggregates real-time news, and utilizes linear regression models to forecast future price movements.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Python", "FastAPI", "Scikit-learn", "Recharts", "yfinance"],
    demoUrl: "#",
    codeUrl: "https://github.com/t-goel/MarketDashboard",
  },
  {
    title: "Reinforcement Learning Pac-Man",
    description: "A Pac-Man implementation built in PyGame that uses Q-Learning(a type of machine learning) to intelligently guide ghosts.",
    techStack: ["Python", "PyGame", "Pickle"],
    demoUrl: "#",
    codeUrl: "https://github.com/t-goel/Pacman-Q-Learning",
   },
  // {
  //   title: "ML Image Classifier",
  //   description: "Image classification API using machine learning models with high accuracy and fast inference.",
  //   techStack: ["Python", "TensorFlow", "FastAPI", "Docker"],
  //   codeUrl: "#",
  // },
]

const certifications = [
  // {
  //   title: "AWS Certified AI Practitioner",
  //   issuer: "Amazon Web Services",
  //   date: "2026",
  //   credentialUrl: "#",
  // },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2025",
    credentialUrl: "#",
  },
  {
    title: "PCEP - Certified Entry-Level Python Programmer",
    issuer: "Python Institute",
    date: "2022", 
    credentialUrl: "#",
  },
  {
    title: "Lifeguarding (Including Deep Water) with CPR/AED for Professional Rescuers and First Aid",
    issuer: "Red Cross",
    date: "2024",
    credentialUrl: "#",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            About{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ad3535 0%, #d44545 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Me
            </span>
          </h2>
          <div className="mt-8 p-8 glassmorphism rounded-2xl">
            <p className="text-muted-foreground leading-relaxed text-lg">
              Hi I'm Tanmay! I'm a passionate Software Developer with a deep interest in artificial intelligence and its applications
              in economics. My journey in tech has been driven by curiosity and a constant desire to learn
              and grow.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed text-lg">
              I specialize in building applications that leverage the power of AI to create intelligent,
              responsive, and user-centric experiences. Recently, I've been exploring how natural language processing can used to derive macroeconomic insights.
              
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed text-lg">
              When I'm not coding, you'll find me doing something active, learning new skills, or 
              playing board games with my friends.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 grid-bg">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Featured{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #ad3535 0%, #d44545 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Projects
          </span>
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-24 px-4">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          <span
            style={{
              background: "linear-gradient(135deg, #ad3535 0%, #d44545 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Certifications
          </span>
        </motion.h2>
        <div className="grid gap-4">
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.title} {...cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-4 grid-bg">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Get In{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ad3535 0%, #d44545 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Touch
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          <div className="mt-12 flex justify-center gap-6">
            <a
              href="https://github.com/t-goel"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-card border border-border hover:border-[#ad3535] hover:glow-purple transition-all duration-300 group"
              aria-label="GitHub"
            >
              <Github size={28} className="text-muted-foreground group-hover:text-[#ad3535] transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/tim-goel/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-card border border-border hover:border-[#ad3535] hover:glow-purple transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin size={28} className="text-muted-foreground group-hover:text-[#ad3535] transition-colors" />
            </a>
            <a
              href="mailto:timgoelny@gmail.com"
              className="p-4 rounded-full bg-card border border-border hover:border-[#ad3535] hover:glow-purple transition-all duration-300 group"
              aria-label="Email"
            >
              <Mail size={28} className="text-muted-foreground group-hover:text-[#ad3535] transition-colors" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-24 text-center text-muted-foreground/60 text-sm font-mono">
        <p>© {new Date().getFullYear()} Tanmay Goel.</p>
      </div>
    </section>
  )
}

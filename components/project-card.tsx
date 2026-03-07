"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  demoUrl?: string
  codeUrl?: string
  index: number
}

export function ProjectCard({ title, description, techStack, demoUrl, codeUrl, index }: ProjectCardProps) {
  // Check if links exist and are not just placeholders
  const hasDemo = demoUrl && demoUrl !== "#";
  const hasCode = codeUrl && codeUrl !== "#";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-[#ad3535]/50 transition-all duration-300"
    >
      {/* Purple bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ad3535] via-[#d44545] to-[#8a2020] opacity-50 group-hover:opacity-100 transition-opacity" />

      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground group-hover:text-[#ad3535] transition-colors">{title}</h3>
        <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{description}</p>

        {/* Tech stack tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-mono font-medium bg-[#ad3535]/10 text-[#ad3535] rounded-full border border-[#ad3535]/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex gap-3">
          {hasDemo && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#ad3535] rounded-lg glow-purple-sm hover:bg-[#8a2020] transition-all"
            >
              <ExternalLink size={16} />
              Demo
            </a>
          )}
          {hasCode && (
            <a
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground border border-border rounded-lg hover:border-[#ad3535]/50 hover:bg-[#ad3535]/10 transition-all"
            >
              <Github size={16} />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
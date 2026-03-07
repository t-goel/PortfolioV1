"use client"

import { motion } from "framer-motion"
import { Award, ExternalLink } from "lucide-react"

interface CertificationCardProps {
  title: string
  issuer: string
  date: string
  credentialUrl?: string
  index: number
}

export function CertificationCard({ title, issuer, date, credentialUrl, index }: CertificationCardProps) {
  // We check if it exists AND if it is not just a placeholder hash
  const hasValidLink = credentialUrl && credentialUrl !== "#";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border hover:border-[#ad3535]/50 transition-all duration-300 group"
    >
      <div className="flex-shrink-0 p-3 rounded-lg bg-[#ad3535]/10 text-[#ad3535] group-hover:glow-purple-sm transition-all">
        <Award size={24} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground group-hover:text-[#ad3535] transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{issuer}</p>
        <p className="text-xs text-muted-foreground/70 font-mono mt-1">{date}</p>
      </div>
      
      {/* Updated Condition Here */}
      {hasValidLink && (
        <a
          href={credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 p-2 text-muted-foreground hover:text-[#ad3535] transition-colors"
          aria-label="View credential"
        >
          <ExternalLink size={18} />
        </a>
      )}
    </motion.div>
  )
}
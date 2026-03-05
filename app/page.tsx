"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { AboutSection, ProjectsSection, CertificationsSection, ContactSection } from "@/components/sections"
import { Intro } from "@/components/intro"

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      <Intro onComplete={() => setIntroComplete(true)} />
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transition: "opacity 0.8s ease-in-out",
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <AboutSection />
          <ProjectsSection />
          <CertificationsSection />
          <ContactSection />
        </main>
      </div>
    </>
  )
}

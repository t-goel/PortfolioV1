"use client"

import { useState, useEffect, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { AboutSection, ProjectsSection, CertificationsSection, ContactSection } from "@/components/sections"
import { Intro } from "@/components/intro"

export default function Home() {
  const [ready, setReady] = useState(false)
  const [skipIntro, setSkipIntro] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("intro-played")) {
      setSkipIntro(true)
      setIntroComplete(true)
    }
    setReady(true)
  }, [])

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem("intro-played", "1")
    setIntroComplete(true)
  }, [])

  if (!ready) return null

  return (
    <>
      {!skipIntro && <Intro onComplete={handleIntroComplete} />}
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

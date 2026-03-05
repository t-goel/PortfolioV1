"use client"

import { useState, useEffect, useCallback, useRef, useMemo } from "react"

interface Shard {
  id: number
  clipPath: string
  vertices: { x: number; y: number }[]
  midX: number
  midY: number
  rotation: number
  delay: number
  fallX: number
  fallY: number
  isCenter: boolean
}

const CENTER_RADIUS = 10


// Expand a polygon slightly outward from its centroid to prevent sub-pixel gaps
function expandPoly(
  verts: { x: number; y: number }[],
  amount: number
): { x: number; y: number }[] {
  const cx = verts.reduce((s, v) => s + v.x, 0) / verts.length
  const cy = verts.reduce((s, v) => s + v.y, 0) / verts.length
  return verts.map((v) => {
    const dx = v.x - cx
    const dy = v.y - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist === 0) return v
    return { x: v.x + (dx / dist) * amount, y: v.y + (dy / dist) * amount }
  })
}

function generateShards(): Shard[] {
  const shards: Shard[] = []
  let id = 0

  const cols = 7
  const rows = 7
  const cellW = 100 / cols
  const cellH = 100 / rows

  // Generate jittered grid points (shared between adjacent cells)
  const points: { x: number; y: number }[][] = []
  for (let r = 0; r <= rows; r++) {
    points[r] = []
    for (let c = 0; c <= cols; c++) {
      const isEdge = r === 0 || r === rows || c === 0 || c === cols
      const jitterX = isEdge ? 0 : (Math.random() - 0.5) * cellW * 0.5
      const jitterY = isEdge ? 0 : (Math.random() - 0.5) * cellH * 0.5
      points[r][c] = {
        x: c * cellW + jitterX,
        y: r * cellH + jitterY,
      }
    }
  }

  const screenCenterX = 50
  const screenCenterY = 50

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tl = points[r][c]
      const tr = points[r][c + 1]
      const br = points[r + 1][c + 1]
      const bl = points[r + 1][c]

      const midX = (tl.x + tr.x + br.x + bl.x) / 4
      const midY = (tl.y + tr.y + br.y + bl.y) / 4

      const distFromCenter = Math.sqrt(
        Math.pow(midX - screenCenterX, 2) + Math.pow(midY - screenCenterY, 2)
      )

      const isCenter = distFromCenter < CENTER_RADIUS

      // Expand slightly to prevent sub-pixel gaps between cells
      const expanded = expandPoly([tl, tr, br, bl], 0)
      const clipPath = `polygon(${expanded.map((v) => `${v.x}% ${v.y}%`).join(", ")})`

      const angle = Math.atan2(midY - screenCenterY, midX - screenCenterX)
      const fallDistance = 120 + Math.random() * 80

      const maxDist = 70
      const normalizedDist = Math.min(distFromCenter / maxDist, 1)
      const delay = (1 - normalizedDist) * 0.8 + Math.random() * 0.2

      shards.push({
        id: id++,
        clipPath,
        vertices: [tl, tr, br, bl],
        midX,
        midY,
        rotation: (Math.random() - 0.5) * 30,
        delay,
        fallX: Math.cos(angle) * fallDistance,
        fallY: Math.sin(angle) * fallDistance + 50,
        isCenter,
      })
    }
  }

  return shards
}

// Compute convex hull (Graham scan) for clipping the loading text to the center area
function convexHull(pts: { x: number; y: number }[]): { x: number; y: number }[] {
  const unique = [
    ...new Map(
      pts.map((p) => [`${p.x.toFixed(4)},${p.y.toFixed(4)}`, p])
    ).values(),
  ]
  if (unique.length < 3) return unique

  unique.sort((a, b) => a.x - b.x || a.y - b.y)

  const cross = (
    O: { x: number; y: number },
    A: { x: number; y: number },
    B: { x: number; y: number }
  ) => (A.x - O.x) * (B.y - O.y) - (A.y - O.y) * (B.x - O.x)

  const lower: { x: number; y: number }[] = []
  for (const p of unique) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0)
      lower.pop()
    lower.push(p)
  }

  const upper: { x: number; y: number }[] = []
  for (let i = unique.length - 1; i >= 0; i--) {
    const p = unique[i]
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0)
      upper.pop()
    upper.push(p)
  }

  return [...lower.slice(0, -1), ...upper.slice(0, -1)]
}

export function Intro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<
    "idle" | "cracking" | "falling" | "pivot" | "drop" | "done"
  >("idle")
  const [shards, setShards] = useState<Shard[]>([])
  const hasInitialized = useRef(false)

  const startAnimation = useCallback(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true
    setShards(generateShards())

    setTimeout(() => setPhase("cracking"), 400)
    setTimeout(() => setPhase("falling"), 1200)
    setTimeout(() => setPhase("pivot"), 2400)
    setTimeout(() => setPhase("drop"), 4800)
    setTimeout(() => {
      setPhase("done")
      onComplete()
    }, 5800)
  }, [onComplete])

  useEffect(() => {
    startAnimation()
  }, [startAnimation])

  const outerShards = useMemo(() => shards.filter((s) => !s.isCenter), [shards])
  const centerShards = useMemo(() => shards.filter((s) => s.isCenter), [shards])

  // Pivot point: top-right vertex of the center shard (like a nail on the right side)
  const pivot = useMemo(() => {
    if (centerShards.length === 0) return { x: 50, y: 50 }
    // vertices are [tl, tr, br, bl] — use tr (index 1) for right-side pivot
    const tr = centerShards[0].vertices[1]
    return { x: tr.x, y: tr.y }
  }, [centerShards])

  // Convex hull of all center cell vertices, used to clip loading text
  const centerClip = useMemo(() => {
    if (centerShards.length === 0) return "none"
    const allVerts = centerShards.flatMap((s) => s.vertices)
    const hull = convexHull(allVerts)
    // Expand hull slightly so text doesn't get clipped at edges
    const expanded = expandPoly(hull, 0.5)
    return `polygon(${expanded.map((v) => `${v.x}% ${v.y}%`).join(", ")})`
  }, [centerShards])

  if (phase === "done") return null

  const showCenterPiece =
    phase === "falling" || phase === "pivot" || phase === "drop"

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      aria-hidden="true"
    >
      {/* Crack lines SVG overlay */}
      {(phase === "cracking" || phase === "falling") && (
        <svg
          className="absolute inset-0 w-full h-full z-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            opacity: phase === "falling" ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <CrackLines />
        </svg>
      )}

      {/* Outer shards - fall away from center */}
      {outerShards.map((shard) => (
        <div
          key={shard.id}
          className="absolute inset-0 z-20"
          style={{
            clipPath: shard.clipPath,
            transform:
              phase === "falling" || phase === "pivot" || phase === "drop"
                ? `translate(${shard.fallX}px, ${shard.fallY}px) rotate(${shard.rotation}deg)`
                : "translate(0, 0) rotate(0deg)",
            opacity:
              phase === "falling" || phase === "pivot" || phase === "drop"
                ? 0
                : 1,
            transition: `transform ${0.8 + Math.random() * 0.4}s cubic-bezier(0.55, 0.06, 0.68, 0.19) ${shard.delay}s, opacity 0.6s ease ${shard.delay + 0.3}s`,
            willChange: "transform, opacity",
          }}
        >
          <div className="w-full h-full bg-[#fafafa]" />
        </div>
      ))}

      {/* Center piece - composed of actual grid cells so edges align perfectly.
          Pivots like a loose picture frame, then drops. */}
      <div
        className="absolute inset-0 z-30"
        style={{
          transformOrigin: `${pivot.x}% ${pivot.y}%`,
          animation: showCenterPiece
            ? phase === "drop"
              ? "pivotDrop 0.9s cubic-bezier(0.6, 0, 1, 0.4) forwards"
              : phase === "pivot"
                ? "pivotSwing 2.2s ease-in-out forwards"
                : "none"
            : "none",
          willChange: "transform, opacity",
        }}
      >
        {/* Individual center cells with grid-aligned clip paths */}
        {centerShards.map((shard) => (
          <div
            key={shard.id}
            className="absolute inset-0"
            style={{ clipPath: shard.clipPath }}
          >
            <div className="w-full h-full bg-[#fafafa]" />
          </div>
        ))}
        {/* Loading indicator, clipped to center area */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ clipPath: centerClip }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-1.5">
              <span
                className="block w-2 h-2 rounded-full bg-[#0a0a0a]"
                style={{
                  animation: "loadDot 1.4s ease-in-out infinite",
                  animationDelay: "0s",
                }}
              />
              <span
                className="block w-2 h-2 rounded-full bg-[#0a0a0a]"
                style={{
                  animation: "loadDot 1.4s ease-in-out infinite",
                  animationDelay: "0.2s",
                }}
              />
              <span
                className="block w-2 h-2 rounded-full bg-[#0a0a0a]"
                style={{
                  animation: "loadDot 1.4s ease-in-out infinite",
                  animationDelay: "0.4s",
                }}
              />
            </div>
            <span className="text-sm font-mono tracking-[0.3em] uppercase text-[#0a0a0a]">
              Loading
            </span>
          </div>
        </div>
      </div>


      {/* Full white base layer */}
      {phase === "idle" || phase === "cracking" ? (
        <div className="absolute inset-0 z-0 bg-[#fafafa]" />
      ) : null}
    </div>
  )
}

function CrackLines() {
  const lines: { d: string; delay: number }[] = []

  const numCracks = 8
  for (let i = 0; i < numCracks; i++) {
    const angle = (i / numCracks) * Math.PI * 2 + (Math.random() - 0.5) * 0.3
    const length = 40 + Math.random() * 20
    const segments = 3 + Math.floor(Math.random() * 3)
    let path = `M 50 50`
    let curX = 50
    let curY = 50

    for (let s = 1; s <= segments; s++) {
      const segLen = length / segments
      const jitter = (Math.random() - 0.5) * 8
      curX += Math.cos(angle + jitter * 0.05) * segLen
      curY += Math.sin(angle + jitter * 0.05) * segLen
      path += ` L ${curX} ${curY}`
    }

    lines.push({ d: path, delay: i * 0.05 })

    if (Math.random() > 0.3) {
      const branchStart = 0.3 + Math.random() * 0.4
      const bx = 50 + Math.cos(angle) * length * branchStart
      const by = 50 + Math.sin(angle) * length * branchStart
      const branchAngle = angle + (Math.random() - 0.5) * 1.2
      const branchLen = 10 + Math.random() * 15
      const bex = bx + Math.cos(branchAngle) * branchLen
      const bey = by + Math.sin(branchAngle) * branchLen
      lines.push({
        d: `M ${bx} ${by} L ${bex} ${bey}`,
        delay: i * 0.05 + 0.15,
      })
    }
  }

  return (
    <>
      {lines.map((line, i) => (
        <path
          key={i}
          d={line.d}
          fill="none"
          stroke="#d4d4d4"
          strokeWidth="0.3"
          vectorEffect="non-scaling-stroke"
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
            animation: `crackDraw 0.4s ease-out ${line.delay}s forwards`,
          }}
        />
      ))}
    </>
  )
}

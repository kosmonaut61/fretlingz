"use client"

import { useState } from "react"
import { type Chord, getNoteHexColor } from "@/lib/chord-data"

interface ChordCardProps {
  chord: Chord
}

// Chord type descriptor mapping
function getChordTypeDescriptor(suffix: string): string {
  const descriptors: Record<string, string> = {
    major: "Air",
    minor: "Earth",
    "7": "Fire",
    m7: "Water",
    maj7: "Light",
    dim: "Shadow",
    aug: "Storm",
    "6": "Wind",
    m6: "Mist",
    "9": "Echo",
    sus2: "Spark",
    sus4: "Flow",
  }
  return descriptors[suffix] || "Chord"
}

export function ChordCard({ chord }: ChordCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [positionIndex, setPositionIndex] = useState(0)
  const currentPosition = chord.positions[positionIndex]

  const noteColor = getNoteHexColor(chord.key)
  const chordTypeDescriptor = getChordTypeDescriptor(chord.suffix)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div
      className="relative w-full aspect-[3/4] cursor-pointer perspective-1000"
      onClick={handleFlip}
      style={{ perspective: "1000px" }}
    >
      <div
        className={`relative w-full h-full preserve-3d transition-transform duration-600 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front of Card - Fretling Image */}
        <div
          className="absolute inset-0 backface-hidden rounded-lg border-2 border-foreground bg-background overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="flex flex-col h-full p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-foreground leading-tight">{chord.name}</h3>
                <p className="text-sm text-foreground/80 mt-1">{chordTypeDescriptor}</p>
              </div>
              {/* Root Note Badge */}
              <div
                className="rounded-lg px-3 py-2 flex items-center justify-center min-w-[48px]"
                style={{
                  backgroundColor: noteColor,
                }}
              >
                <span className="text-2xl font-bold text-white">{chord.key}</span>
              </div>
            </div>

            {/* Fretling Image Area */}
            <div className="flex-1 border-2 border-foreground rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              {/* Placeholder - will be replaced with actual fretling images */}
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <div className="text-6xl mb-2">🎸</div>
                  <p className="text-sm">{chord.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back of Card - Chord Diagram */}
        <div
          className="absolute inset-0 backface-hidden rounded-lg border-2 border-foreground bg-background overflow-hidden rotate-y-180"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex flex-col h-full p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-foreground leading-tight">{chord.name}</h3>
                <p className="text-sm text-foreground/80 mt-1">{chordTypeDescriptor}</p>
              </div>
              {/* Root Note Badge */}
              <div
                className="rounded-lg px-3 py-2 flex items-center justify-center min-w-[48px]"
                style={{
                  backgroundColor: noteColor,
                }}
              >
                <span className="text-2xl font-bold text-white">{chord.key}</span>
              </div>
            </div>

            {/* Chord Diagram Area */}
            <div className="flex-1 border-2 border-foreground rounded-lg bg-black flex items-center justify-center p-4">
              <ChordDiagramCard positions={currentPosition} noteColor={noteColor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Simplified chord diagram for card back
function ChordDiagramCard({
  positions,
  noteColor,
}: {
  positions: typeof import("@/lib/chord-data").ChordPosition
  noteColor: string
}) {
  const { positions: frets, fingerings, baseFret, barres } = positions

  // Card diagram size - matching the image aspect ratio (approximately square)
  const diagramSize = 200
  const numFrets = 4
  const numStrings = 6
  const padding = 20
  const fretboardWidth = diagramSize - padding * 2
  const fretboardHeight = diagramSize - padding * 2
  const stringGap = fretboardWidth / (numStrings - 1)
  const fretHeight = fretboardHeight / numFrets

  return (
    <svg
      width={diagramSize}
      height={diagramSize}
      viewBox={`0 0 ${diagramSize} ${diagramSize}`}
      className="text-white"
    >
      {/* Strings (vertical lines) */}
      {Array.from({ length: numStrings }).map((_, i) => (
        <line
          key={`string-${i}`}
          x1={padding + i * stringGap}
          y1={padding}
          x2={padding + i * stringGap}
          y2={padding + fretboardHeight}
          stroke="white"
          strokeWidth={1.5}
        />
      ))}

      {/* Nut (thick line at top) */}
      <line
        x1={padding}
        y1={padding}
        x2={padding + fretboardWidth}
        y2={padding}
        stroke="white"
        strokeWidth={3}
      />

      {/* Frets (horizontal lines) */}
      {Array.from({ length: numFrets + 1 }).map((_, i) => (
        <line
          key={`fret-${i}`}
          x1={padding}
          y1={padding + i * fretHeight}
          x2={padding + fretboardWidth}
          y2={padding + i * fretHeight}
          stroke="white"
          strokeWidth={1}
          opacity={i === 0 ? 1 : 0.5}
        />
      ))}

      {/* Barres */}
      {barres?.map((barreFret, idx) => {
        const barreY = padding + (barreFret - baseFret + 0.5) * fretHeight
        const barreStrings = frets
          .map((f, i) => (typeof f === "number" && f === barreFret ? i : -1))
          .filter((i) => i >= 0)
        if (barreStrings.length > 1) {
          const startString = Math.min(...barreStrings)
          const endString = Math.max(...barreStrings)
          return (
            <rect
              key={`barre-${idx}`}
              x={padding + startString * stringGap - 10}
              y={barreY - 10}
              width={(endString - startString) * stringGap + 20}
              height={20}
              rx={10}
              fill={noteColor}
              opacity={0.9}
            />
          )
        }
        return null
      })}

      {/* Open/Muted strings and finger positions */}
      {frets.map((fret, stringIndex) => {
        const x = padding + stringIndex * stringGap

        if (fret === "x") {
          // Muted string (X)
          return (
            <text
              key={`pos-${stringIndex}`}
              x={x}
              y={padding - 8}
              fontSize={20}
              fill="white"
              textAnchor="middle"
              className="font-bold"
            >
              ×
            </text>
          )
        }

        if (fret === 0) {
          // Open string (O)
          return (
            <circle
              key={`pos-${stringIndex}`}
              cx={x}
              cy={padding - 8}
              r={8}
              fill="none"
              stroke="white"
              strokeWidth={2}
            />
          )
        }

        // Fretted note
        const y = padding + (fret - baseFret + 0.5) * fretHeight
        const finger = fingerings[stringIndex]

        // Skip individual dots if this is part of a barre (already drawn above)
        const isBarrePosition = barres?.includes(fret) && finger === 1
        if (isBarrePosition) {
          // Only skip if there are multiple strings at this fret (barre covers it)
          const stringsAtThisFret = frets.filter((f) => f === fret).length
          if (stringsAtThisFret > 1) return null
        }

        return (
          <g key={`pos-${stringIndex}`}>
            <circle cx={x} cy={y} r={12} fill={noteColor} />
            {finger > 0 && (
              <text
                x={x}
                y={y + 5}
                fontSize={14}
                fill="white"
                textAnchor="middle"
                className="font-bold"
              >
                {finger}
              </text>
            )}
          </g>
        )
      })}

      {/* Fret number indicator */}
      {baseFret > 1 && (
        <text
          x={padding - 12}
          y={padding + fretHeight / 2 + 5}
          fontSize={14}
          fill="white"
          textAnchor="end"
          className="font-mono font-bold"
        >
          {baseFret}
        </text>
      )}
    </svg>
  )
}

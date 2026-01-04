"use client"

import { useState } from "react"
import { type Chord, getNoteHexColor } from "@/lib/chord-data"
import { playChord } from "@/lib/audio-synth"
import { ChordDiagram } from "./chord-diagram"
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react"

interface ChordCardProps {
  chord: Chord
}

export function ChordCard({ chord }: ChordCardProps) {
  const [positionIndex, setPositionIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const currentPosition = chord.positions[positionIndex]
  const hasMultiplePositions = chord.positions.length > 1

  const displayName =
    chord.suffix === "major" ? chord.key : chord.suffix === "minor" ? `${chord.key}m` : `${chord.key}${chord.suffix}`

  const noteColor = getNoteHexColor(chord.key)

  const nextPosition = () => {
    setPositionIndex((prev) => (prev + 1) % chord.positions.length)
  }

  const prevPosition = () => {
    setPositionIndex((prev) => (prev - 1 + chord.positions.length) % chord.positions.length)
  }

  const handlePlayChord = async () => {
    setIsPlaying(true)
    await playChord(currentPosition.positions)
    setTimeout(() => setIsPlaying(false), 300)
  }

  return (
    <div className="neumorphic rounded-2xl p-4 bg-background flex flex-col items-center gap-3 transition-all hover:scale-[1.02] active:neumorphic-pressed">
      {/* Fretling Name */}
      <div className="w-full text-center">
        <h3 className="text-lg font-bold text-foreground">{chord.name}</h3>
      </div>
      
      <div className="flex items-center gap-2 w-full justify-center">
        <div
          className="px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-all"
          style={{
            borderColor: noteColor,
            color: noteColor,
            boxShadow: `0 0 12px ${noteColor}40, 0 0 4px ${noteColor}30`,
            background: `${noteColor}10`,
          }}
        >
          {displayName}
        </div>
        <button
          onClick={handlePlayChord}
          className={`neumorphic rounded-full p-2 hover:neumorphic-pressed transition-all active:scale-95 ${
            isPlaying ? "neumorphic-pressed" : ""
          }`}
          aria-label="Play chord"
          title="Play chord sound"
        >
          <Volume2 className="w-4 h-4" style={{ color: noteColor }} />
        </button>
      </div>

      <ChordDiagram positions={currentPosition} chordName={displayName} noteColor={noteColor} size="md" />

      {hasMultiplePositions && (
        <div className="flex items-center gap-2">
          <button
            onClick={prevPosition}
            className="neumorphic rounded-full p-1.5 hover:neumorphic-pressed transition-all active:scale-95"
            aria-label="Previous position"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs text-muted-foreground font-mono">
            {positionIndex + 1}/{chord.positions.length}
          </span>
          <button
            onClick={nextPosition}
            className="neumorphic rounded-full p-1.5 hover:neumorphic-pressed transition-all active:scale-95"
            aria-label="Next position"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

"use client"

import type { ChordPosition } from "@/lib/chord-data"
import { useTheme } from "next-themes"

interface ChordDiagramProps {
  positions: ChordPosition
  chordName: string
  noteColor: string
  size?: "sm" | "md" | "lg"
}

export function ChordDiagram({ positions, chordName, noteColor, size = "md" }: ChordDiagramProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const { positions: frets, fingerings, baseFret, barres } = positions

  const sizeConfig = {
    sm: { width: 80, height: 100, fretHeight: 16, stringGap: 12, dotSize: 8, fontSize: 8 },
    md: { width: 120, height: 150, fretHeight: 24, stringGap: 18, dotSize: 12, fontSize: 11 },
    lg: { width: 160, height: 200, fretHeight: 32, stringGap: 24, dotSize: 16, fontSize: 13 },
  }

  const config = sizeConfig[size]
  const numFrets = 5
  const numStrings = 6
  const startX = 20
  const startY = 25
  const fretboardWidth = config.stringGap * (numStrings - 1)
  const fretboardHeight = config.fretHeight * numFrets

  const nutColor = isDark ? "#ffffff" : "#1f2937"
  const openStringColor = isDark ? "#ffffff" : "#1f2937"
  const mutedColor = "currentColor"

  return (
    <div className="flex flex-col items-center">
      <svg
        width={config.width}
        height={config.height}
        viewBox={`0 0 ${config.width} ${config.height}`}
        className="text-foreground"
      >
        {/* Fret number indicator */}
        {baseFret > 1 && (
          <text
            x={startX - 14}
            y={startY + config.fretHeight / 2 + 4}
            fontSize={config.fontSize + 2}
            fill="currentColor"
            className="font-mono"
          >
            {baseFret}
          </text>
        )}

        {baseFret === 1 && (
          <rect x={startX - 1} y={startY - 4} width={fretboardWidth + 2} height={5} fill={nutColor} rx={1} />
        )}

        {/* Frets (horizontal lines) */}
        {Array.from({ length: numFrets + 1 }).map((_, i) => (
          <line
            key={`fret-${i}`}
            x1={startX}
            y1={startY + i * config.fretHeight}
            x2={startX + fretboardWidth}
            y2={startY + i * config.fretHeight}
            stroke="currentColor"
            strokeWidth={i === 0 && baseFret === 1 ? 0 : 1}
            strokeOpacity={0.3}
          />
        ))}

        {/* Strings (vertical lines) */}
        {Array.from({ length: numStrings }).map((_, i) => (
          <line
            key={`string-${i}`}
            x1={startX + i * config.stringGap}
            y1={startY}
            x2={startX + i * config.stringGap}
            y2={startY + fretboardHeight}
            stroke="currentColor"
            strokeWidth={1}
            strokeOpacity={0.4}
          />
        ))}

        {barres?.map((barreFret, idx) => {
          const barreY = startY + (barreFret - baseFret + 0.5) * config.fretHeight
          const barreStrings = frets
            .map((f, i) => (typeof f === "number" && f >= barreFret ? i : -1))
            .filter((i) => i >= 0)
          if (barreStrings.length > 1) {
            const startString = Math.min(...barreStrings)
            const endString = Math.max(...barreStrings)
            return (
              <g key={`barre-${idx}`}>
                <rect
                  x={startX + startString * config.stringGap - config.dotSize / 2}
                  y={barreY - config.dotSize / 2}
                  width={(endString - startString) * config.stringGap + config.dotSize}
                  height={config.dotSize}
                  rx={config.dotSize / 2}
                  fill={noteColor}
                  fillOpacity={0.5}
                  stroke={noteColor}
                  strokeWidth={1}
                />
                {/* Barre finger number */}
                <text
                  x={startX + startString * config.stringGap}
                  y={barreY + config.fontSize / 3}
                  fontSize={config.fontSize}
                  fill="#ffffff"
                  textAnchor="middle"
                  className="font-mono font-bold"
                >
                  1
                </text>
              </g>
            )
          }
          return null
        })}

        {frets.map((fret, stringIndex) => {
          const x = startX + stringIndex * config.stringGap

          if (fret === "x") {
            // Muted string (X)
            return (
              <text
                key={`pos-${stringIndex}`}
                x={x}
                y={startY - 10}
                fontSize={config.fontSize + 2}
                fill={mutedColor}
                textAnchor="middle"
                className="font-sans"
              >
                ×
              </text>
            )
          }

          if (fret === 0) {
            // Open string (O) - white ring
            return (
              <circle
                key={`pos-${stringIndex}`}
                cx={x}
                cy={startY - 10}
                r={config.dotSize / 2 - 1}
                fill="none"
                stroke={openStringColor}
                strokeWidth={2}
              />
            )
          }

          // Fretted note
          const y = startY + (fret - baseFret + 0.5) * config.fretHeight
          const finger = fingerings[stringIndex]

          // Skip if this is part of a barre and not the first position
          const isBarrePosition = barres?.includes(fret) && finger === 1
          if (isBarrePosition && stringIndex > 0) {
            const hasBarreHere = frets.slice(0, stringIndex).some((f, i) => f === fret && fingerings[i] === 1)
            if (hasBarreHere) return null
          }

          return (
            <g key={`pos-${stringIndex}`}>
              <circle
                cx={x}
                cy={y}
                r={config.dotSize / 2}
                fill={noteColor}
                fillOpacity={0.5}
                stroke={noteColor}
                strokeWidth={1}
              />
              {finger > 0 && (
                <text
                  x={x}
                  y={y + config.fontSize / 3}
                  fontSize={config.fontSize}
                  fill="#ffffff"
                  textAnchor="middle"
                  className="font-mono font-bold"
                >
                  {finger}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

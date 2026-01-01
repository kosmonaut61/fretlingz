"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChordCard } from "./chord-card"
import { chordDatabase, type Chord } from "@/lib/chord-data"
import { playChord } from "@/lib/audio-synth"
import { Package, Sparkles } from "lucide-react"

// Rarity weights - lower suffix index = more common
const RARITY_WEIGHTS: Record<string, number> = {
  major: 30,
  minor: 25,
  "7": 15,
  sus2: 10,
  sus4: 10,
  m7: 5,
  maj7: 5,
  "6": 4,
  m6: 3,
  "9": 3,
  dim: 2,
  aug: 2,
}

const PACK_SIZES = [2, 4, 8, 12] as const

function getRandomPackSize(): number {
  return PACK_SIZES[Math.floor(Math.random() * PACK_SIZES.length)]
}

function getWeightedRandomChord(): Chord {
  // Build weighted pool
  const weightedPool: Chord[] = []

  chordDatabase.forEach((chord) => {
    const weight = RARITY_WEIGHTS[chord.suffix] || 1
    for (let i = 0; i < weight; i++) {
      weightedPool.push(chord)
    }
  })

  return weightedPool[Math.floor(Math.random() * weightedPool.length)]
}

function getRarityLabel(suffix: string): { label: string; color: string } {
  const weight = RARITY_WEIGHTS[suffix] || 1
  if (weight >= 25) return { label: "Common", color: "#6b7280" }
  if (weight >= 10) return { label: "Uncommon", color: "#22c55e" }
  if (weight >= 5) return { label: "Rare", color: "#3b82f6" }
  return { label: "Epic", color: "#a855f7" }
}

// Confetti particle component
function ConfettiParticle({ delay, color }: { delay: number; color: string }) {
  const randomX = Math.random() * 100
  const randomRotation = Math.random() * 360
  const randomDuration = 2 + Math.random() * 2

  return (
    <div
      className="absolute w-3 h-3 opacity-0"
      style={{
        left: `${randomX}%`,
        top: "-10px",
        backgroundColor: color,
        animation: `confetti-fall ${randomDuration}s ease-out ${delay}s forwards`,
        transform: `rotate(${randomRotation}deg)`,
        borderRadius: Math.random() > 0.5 ? "50%" : "0",
      }}
    />
  )
}

// Confetti explosion component
function ConfettiExplosion() {
  const colors = ["#22c55e", "#3b82f6", "#a855f7", "#f59e0b", "#ef4444", "#ec4899"]
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <ConfettiParticle key={p.id} delay={p.delay} color={p.color} />
      ))}
    </div>
  )
}

export function PackOpener() {
  const [packChords, setPackChords] = useState<Chord[]>([])
  const [revealedCount, setRevealedCount] = useState(0)
  const [isOpening, setIsOpening] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [packSize, setPackSize] = useState<number | null>(null)

  const openPack = useCallback(() => {
    setIsOpening(true)
    setRevealedCount(0)
    setShowConfetti(true)

    const size = getRandomPackSize()
    setPackSize(size)

    // Generate random chords for the pack
    const chords: Chord[] = []
    for (let i = 0; i < size; i++) {
      chords.push(getWeightedRandomChord())
    }
    setPackChords(chords)

    // Hide confetti after animation
    setTimeout(() => setShowConfetti(false), 3000)

    // Reveal cards one by one
    let revealed = 0
    const revealInterval = setInterval(() => {
      revealed++
      setRevealedCount(revealed)

      if (revealed <= chords.length) {
        const chord = chords[revealed - 1]
        // Play the first position of the chord
        if (chord.positions[0]) {
          playChord(chord.positions[0].positions).catch((err) => {
            console.log("[v0] Could not play chord sound:", err)
          })
        }
      }

      if (revealed >= size) {
        clearInterval(revealInterval)
        setIsOpening(false)
      }
    }, 400)
  }, [])

  const resetPack = () => {
    setPackChords([])
    setRevealedCount(0)
    setPackSize(null)
  }

  const packRarity =
    packChords.length > 0
      ? packChords
          .map((chord) => getRarityLabel(chord.suffix))
          .reduce((best, current) => {
            const rarityOrder = ["Common", "Uncommon", "Rare", "Epic"]
            return rarityOrder.indexOf(current.label) > rarityOrder.indexOf(best.label) ? current : best
          })
      : null

  return (
    <div className="flex flex-col gap-6">
      {/* Confetti CSS */}
      <style jsx global>{`
        @keyframes confetti-fall {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(720deg) scale(0.5);
          }
        }
        
        @keyframes card-reveal {
          0% {
            opacity: 0;
            transform: scale(0.3) rotateY(180deg);
          }
          50% {
            transform: scale(1.1) rotateY(90deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
          }
        }
        
        .card-revealed {
          animation: card-reveal 0.5s ease-out forwards;
        }
      `}</style>

      {showConfetti && <ConfettiExplosion />}

      {/* Pack opening area */}
      {packChords.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-6 py-12">
          <div className="neumorphic rounded-3xl p-8 flex flex-col items-center gap-4">
            <div className="relative">
              <Package className="w-24 h-24 text-primary" strokeWidth={1.5} />
              <Sparkles className="w-8 h-8 text-yellow-500 absolute -top-2 -right-2 animate-pulse" />
            </div>
            <h2 className="text-xl font-bold text-center">Chord Card Pack</h2>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              Open a pack to reveal random chord cards! Pack sizes vary from 2 to 12 cards.
            </p>
            <div className="flex gap-2 flex-wrap justify-center text-xs">
              <span className="px-2 py-1 rounded-full bg-gray-500/20 text-gray-400">Common</span>
              <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400">Uncommon</span>
              <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">Rare</span>
              <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">Epic</span>
            </div>
          </div>

          <Button onClick={openPack} size="lg" className="px-8 text-lg gap-2">
            <Package className="w-5 h-5" />
            Open Pack
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Pack info header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">{packSize}-Card Pack</h2>
              {packRarity && (
                <span
                  className="px-2 py-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: `${packRarity.color}20`,
                    color: packRarity.color,
                    border: `1px solid ${packRarity.color}40`,
                  }}
                >
                  {packRarity.label}
                </span>
              )}
              <span className="text-sm text-muted-foreground">
                {revealedCount}/{packSize} revealed
              </span>
            </div>
            {!isOpening && (
              <Button variant="outline" onClick={resetPack} size="sm">
                Open Another
              </Button>
            )}
          </div>

          {/* Cards grid */}
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${packSize && packSize <= 4 ? packSize : packSize === 8 ? 4 : 4}, minmax(0, 1fr))`,
            }}
          >
            {packChords.map((chord, idx) => {
              const isRevealed = idx < revealedCount
              const rarity = getRarityLabel(chord.suffix)

              return (
                <div key={idx} className="relative">
                  {isRevealed ? (
                    <div className="card-revealed">
                      <div
                        className="absolute -top-2 -right-2 z-10 px-2 py-0.5 rounded-full text-[10px] font-bold"
                        style={{
                          backgroundColor: `${rarity.color}20`,
                          color: rarity.color,
                          border: `1px solid ${rarity.color}40`,
                        }}
                      >
                        {rarity.label}
                      </div>
                      <ChordCard chord={chord} />
                    </div>
                  ) : (
                    <div className="neumorphic rounded-2xl p-4 bg-background flex flex-col items-center justify-center aspect-square min-h-[200px]">
                      <div className="neumorphic-inset rounded-xl p-6 flex items-center justify-center">
                        <span className="text-4xl font-bold text-muted-foreground/30">?</span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { getChord } from "@/lib/chord-data"
import { ChordCard } from "./chord-card"
import { Plus, Minus } from "lucide-react"

const KEYS = ["C", "G", "D", "A", "E", "B", "F#", "C#", "F", "Bb", "Eb", "Ab"]

const PROGRESSION_FAMILIES = [
  { name: "Pop", progression: ["I", "V", "vi", "IV"] },
  { name: "Sad Pop", progression: ["vi", "IV", "I", "V"] },
  { name: "Rock", progression: ["I", "IV", "V", "I"] },
  { name: "50s", progression: ["I", "vi", "IV", "V"] },
  { name: "Minor loop", progression: ["i", "bVII", "bVI", "bVII"] },
  { name: "Jazz-ish", progression: ["ii", "V", "I", "vi"] },
]

const FLAVORS = [
  "Replace every major with add9",
  "First chord is sus2, resolve it later",
  "One chord becomes a 7th (V7 or ii7)",
  "Use a secondary dominant once (V/vi or V/ii)",
  'Make one chord minor (modal mixture "borrow")',
  "Change the last chord to a turnaround (V or V7)",
]

const DIFFICULTY_SETTINGS = {
  1: {
    name: "Level 1 - All Major",
    description: "Simple major chords only",
    useMinor: false, // Never use minor
    spiceChance: 0, // No variations
  },
  2: {
    name: "Level 2 - Major + Minor",
    description: "Mostly major with some minor",
    useMinor: true, // Respect original minor chords
    spiceChance: 0, // Still no advanced variations
  },
  3: {
    name: "Level 3 - Add Some Spice",
    description: "Sprinkle in sus2, 7ths, etc.",
    useMinor: true, // Respect original minor chords
    spiceChance: 0.25, // 25% chance to add a variation
    spiceTypes: ["7", "sus2", "sus4", "maj7", "m7"], // Variations to sprinkle in
  },
}

const CHORD_TYPES_BY_LEVEL = {
  1: {
    name: "Beginner - Basic Chords",
    types: ["major", "minor"],
  },
  2: {
    name: "Intermediate - Add Flavors",
    types: ["major", "minor", "7", "sus2", "sus4"],
  },
  3: {
    name: "Advanced - Jazz & Beyond",
    types: ["major", "minor", "7", "m7", "maj7", "sus2", "sus4", "9", "dim", "aug"],
  },
}

interface DiceResult {
  key: string
  family: string
  progression: string[]
  flavor: string
}

function normalizeNoteForLookup(note: string): string {
  const sharpToFlat: { [key: string]: string } = {
    "F#": "Gb",
    "C#": "Db",
    "G#": "Ab",
    "A#": "Bb",
    "D#": "Eb",
  }
  return sharpToFlat[note] || note
}

function getActualChords(key: string, romanNumerals: string[]): string[] {
  const keyScales: { [key: string]: string[] } = {
    C: ["C", "D", "E", "F", "G", "A", "B"],
    G: ["G", "A", "B", "C", "D", "E", "F#"],
    D: ["D", "E", "F#", "G", "A", "B", "C#"],
    A: ["A", "B", "C#", "D", "E", "F#", "G#"],
    E: ["E", "F#", "G#", "A", "B", "C#", "D#"],
    B: ["B", "C#", "D#", "E", "F#", "G#", "A#"],
    "F#": ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
    "C#": ["C#", "D#", "E#", "F#", "G#", "A#", "B#"],
    F: ["F", "G", "A", "Bb", "C", "D", "E"],
    Bb: ["Bb", "C", "D", "Eb", "F", "G", "A"],
    Eb: ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
    Ab: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
  }

  const scale = keyScales[key] || keyScales["C"]

  return romanNumerals.map((roman) => {
    // Check if it starts with lowercase i (like i, ii, iii, iv, v, vi, vii) = minor
    const isMinor = roman[0] === "i"
    const isFlatted = roman.includes("b")

    // Remove 'b' and convert to uppercase to get the base Roman numeral
    const baseRoman = roman.replace(/b/g, "").toUpperCase()

    const romanMap: { [key: string]: number } = {
      I: 0,
      II: 1,
      III: 2,
      IV: 3,
      V: 4,
      VI: 5,
      VII: 6,
    }

    let degree = romanMap[baseRoman] || 0
    if (isFlatted) degree = Math.max(0, degree - 1)

    const note = scale[degree % 7]
    const quality = isMinor ? "minor" : "major"

    console.log("[v0] Roman:", roman, "→ Degree:", degree, "→ Note:", note, "→ Quality:", quality)
    return `${note}${quality === "minor" ? "m" : ""}`
  })
}

function getChordQuality(isMinor: boolean, difficultyLevel: 1 | 2 | 3): string {
  const settings = DIFFICULTY_SETTINGS[difficultyLevel]

  // Level 1: Always return "major" (ignore minor)
  if (difficultyLevel === 1) {
    return "major"
  }

  // Level 2: Use major/minor as written in progression
  if (difficultyLevel === 2) {
    return isMinor && settings.useMinor ? "minor" : "major"
  }

  // Level 3: Mostly use major/minor, but occasionally add spice
  if (difficultyLevel === 3 && settings.spiceChance) {
    const shouldSpice = Math.random() < settings.spiceChance

    if (shouldSpice && settings.spiceTypes) {
      // Pick a random variation
      const availableSpice = isMinor
        ? settings.spiceTypes.filter((type) => ["7", "m7"].includes(type)) // Minor-compatible spice
        : settings.spiceTypes.filter((type) => !["m7"].includes(type)) // Major-compatible spice

      if (availableSpice.length > 0) {
        return availableSpice[Math.floor(Math.random() * availableSpice.length)]
      }
    }
  }

  // Default: use basic major or minor
  return isMinor && settings.useMinor ? "minor" : "major"
}

export function RollTheDice() {
  const [result, setResult] = useState<DiceResult | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [columns, setColumns] = useState(2)
  const [difficultyLevel, setDifficultyLevel] = useState<1 | 2 | 3>(1)

  const rollDice = () => {
    setIsRolling(true)

    setTimeout(() => {
      const keyIndex = Math.floor(Math.random() * KEYS.length)
      const familyIndex = Math.floor(Math.random() * PROGRESSION_FAMILIES.length)
      const flavorIndex = Math.floor(Math.random() * FLAVORS.length)

      const key = KEYS[keyIndex]
      const family = PROGRESSION_FAMILIES[familyIndex]
      const flavor = FLAVORS[flavorIndex]

      setResult({
        key,
        family: family.name,
        progression: family.progression,
        flavor,
      })
      setIsRolling(false)
    }, 600)
  }

  const increaseColumns = () => {
    setColumns((prev) => Math.min(prev + 1, 8))
  }

  const decreaseColumns = () => {
    setColumns((prev) => Math.max(prev - 1, 1))
  }

  const actualChords = result
    ? getActualChords(result.key, result.progression)
        .map((chordName) => {
          const isMinor = chordName.endsWith("m")
          const note = isMinor ? chordName.slice(0, -1) : chordName
          const baseQuality = isMinor ? "minor" : "major"

          const quality = getChordQuality(isMinor, difficultyLevel)

          const normalizedNote = normalizeNoteForLookup(note)
          console.log("[v0] Looking up chord:", `${normalizedNote} ${quality}`)
          const foundChord = getChord(normalizedNote, quality)
          if (!foundChord) {
            console.log("[v0] Chord not found for:", normalizedNote, quality)
            // Fallback to basic major/minor if not found
            const fallbackChord = getChord(normalizedNote, baseQuality)
            if (
              fallbackChord &&
              fallbackChord.positions &&
              Array.isArray(fallbackChord.positions) &&
              fallbackChord.positions.length > 0 &&
              fallbackChord.positions[0]
            ) {
              return fallbackChord
            }
          }
          if (
            foundChord &&
            foundChord.positions &&
            Array.isArray(foundChord.positions) &&
            foundChord.positions.length > 0 &&
            foundChord.positions[0]
          ) {
            return foundChord
          }
          return null
        })
        .filter(Boolean)
    : []

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="neumorphic rounded-2xl p-6">
        <div className="text-sm text-muted-foreground mb-4 font-medium text-center">Difficulty Level</div>
        <div className="flex items-center justify-center gap-4">
          <Button
            variant={difficultyLevel === 1 ? "default" : "outline"}
            onClick={() => setDifficultyLevel(1)}
            className="flex-1"
          >
            Level 1
          </Button>
          <Button
            variant={difficultyLevel === 2 ? "default" : "outline"}
            onClick={() => setDifficultyLevel(2)}
            className="flex-1"
          >
            Level 2
          </Button>
          <Button
            variant={difficultyLevel === 3 ? "default" : "outline"}
            onClick={() => setDifficultyLevel(3)}
            className="flex-1"
          >
            Level 3
          </Button>
        </div>
        <div className="text-xs text-center mt-2 text-muted-foreground">
          {DIFFICULTY_SETTINGS[difficultyLevel].description}
        </div>
      </div>

      <div className="neumorphic-inset rounded-2xl p-6 text-center">
        <div className="text-sm text-muted-foreground mb-3 font-medium">Key</div>
        <div
          className={`text-5xl font-bold mb-2 transition-all duration-300 ${
            isRolling ? "scale-110 animate-bounce" : "scale-100"
          }`}
        >
          {result?.key || "?"}
        </div>
        <div className="text-xs text-muted-foreground">Circle of Fifths</div>
      </div>

      <div className="neumorphic-inset rounded-2xl p-6 text-center">
        <div className="text-sm text-muted-foreground mb-3 font-medium">Family</div>
        <div
          className={`text-3xl font-bold mb-2 transition-all duration-300 ${
            isRolling ? "scale-110 animate-bounce" : "scale-100"
          }`}
        >
          {result?.family || "?"}
        </div>
        <div className="text-xs text-muted-foreground">Progression Type</div>
      </div>

      <div className="neumorphic-inset rounded-2xl p-6 text-center">
        <div className="text-sm text-muted-foreground mb-3 font-medium">Twist</div>
        <div
          className={`text-sm font-bold mb-2 line-clamp-2 transition-all duration-300 ${
            isRolling ? "scale-110 animate-bounce" : "scale-100"
          }`}
        >
          {result?.flavor ? "✓ Applied" : "?"}
        </div>
        <div className="text-xs text-muted-foreground">Flavor Modifier</div>
      </div>

      {result && (
        <div className="neumorphic-inset rounded-2xl p-8 mt-4 animate-in fade-in">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-4">Generated Progression</h3>
            <div className="flex justify-center items-center gap-4 flex-wrap">
              {result.progression.map((chord, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="neumorphic rounded-lg px-4 py-2 font-bold text-lg">{chord}</div>
                  {idx < result.progression.length - 1 && <div className="mx-3 text-muted-foreground">→</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="text-sm text-muted-foreground mb-2">Twist Applied:</div>
            <p className="text-sm font-medium">{result.flavor}</p>
          </div>
        </div>
      )}

      {result && actualChords.length > 0 && (
        <div className="mt-8 animate-in fade-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Play These Chords</h3>
            <div className="flex items-center gap-1 neumorphic rounded-full px-2 py-1">
              <button
                onClick={decreaseColumns}
                disabled={columns <= 1}
                className="neumorphic rounded-full p-1.5 hover:neumorphic-pressed transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Decrease card size"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-medium px-2 text-muted-foreground">{columns}</span>
              <button
                onClick={increaseColumns}
                disabled={columns >= 8}
                className="neumorphic rounded-full p-1.5 hover:neumorphic-pressed transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Increase card size"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: "1rem" }}>
            {actualChords.map((chord, idx) => (
              <ChordCard key={idx} chord={chord} />
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center mt-4">
        <Button onClick={rollDice} disabled={isRolling} size="lg" className="px-8 text-lg">
          {isRolling ? "Rolling..." : "Roll the Dice"}
        </Button>
      </div>
    </div>
  )
}

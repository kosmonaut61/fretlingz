// Comprehensive guitar chord data based on standard chord voicings
// Cross-referenced with common chord libraries

export interface ChordPosition {
  positions: (number | "x")[] // Fret positions for each string (E A D G B e), "x" = muted
  fingerings: number[] // Finger numbers (0 = open/muted, 1-4 = index to pinky)
  baseFret: number // Starting fret position
  barres?: number[] // Frets that are barred
}

export interface Chord {
  key: string // Root note (A, A#, Bb, B, C, etc.)
  suffix: string // Chord type (major, minor, 7, etc.)
  positions: ChordPosition[] // Different voicings
}

// All notes in chromatic order
export const NOTES = ["A", "A#/Bb", "B", "C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab"] as const

// Simplified note list for filtering
export const ROOT_NOTES = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"] as const

// Chord types/suffixes
export const CHORD_TYPES = [
  { suffix: "major", display: "Major" },
  { suffix: "minor", display: "Minor" },
  { suffix: "7", display: "7" },
  { suffix: "m7", display: "m7" },
  { suffix: "maj7", display: "Maj7" },
  { suffix: "dim", display: "dim" },
  { suffix: "aug", display: "aug" },
  { suffix: "6", display: "6" },
  { suffix: "m6", display: "m6" },
  { suffix: "9", display: "9" },
  { suffix: "sus2", display: "sus2" },
  { suffix: "sus4", display: "sus4" },
] as const

// Comprehensive chord database
export const chordDatabase: Chord[] = [
  // A Chords
  {
    key: "A",
    suffix: "major",
    positions: [
      { positions: ["x", 0, 2, 2, 2, 0], fingerings: [0, 0, 1, 2, 3, 0], baseFret: 1 },
      { positions: [5, 7, 7, 6, 5, 5], fingerings: [1, 3, 4, 2, 1, 1], baseFret: 5, barres: [5] },
    ],
  },
  {
    key: "A",
    suffix: "minor",
    positions: [
      { positions: ["x", 0, 2, 2, 1, 0], fingerings: [0, 0, 2, 3, 1, 0], baseFret: 1 },
      { positions: [5, 7, 7, 5, 5, 5], fingerings: [1, 3, 4, 1, 1, 1], baseFret: 5, barres: [5] },
    ],
  },
  {
    key: "A",
    suffix: "7",
    positions: [
      { positions: ["x", 0, 2, 0, 2, 0], fingerings: [0, 0, 1, 0, 2, 0], baseFret: 1 },
      { positions: ["x", 0, 2, 2, 2, 3], fingerings: [0, 0, 1, 1, 1, 2], baseFret: 1, barres: [2] },
    ],
  },
  {
    key: "A",
    suffix: "m7",
    positions: [
      { positions: ["x", 0, 2, 0, 1, 0], fingerings: [0, 0, 2, 0, 1, 0], baseFret: 1 },
      { positions: ["x", 0, 2, 2, 1, 3], fingerings: [0, 0, 2, 3, 1, 4], baseFret: 1 },
    ],
  },
  {
    key: "A",
    suffix: "maj7",
    positions: [{ positions: ["x", 0, 2, 1, 2, 0], fingerings: [0, 0, 2, 1, 3, 0], baseFret: 1 }],
  },
  {
    key: "A",
    suffix: "dim",
    positions: [{ positions: ["x", 0, 1, 2, 1, "x"], fingerings: [0, 0, 1, 3, 2, 0], baseFret: 1 }],
  },
  {
    key: "A",
    suffix: "aug",
    positions: [{ positions: ["x", 0, 3, 2, 2, 1], fingerings: [0, 0, 4, 2, 3, 1], baseFret: 1 }],
  },
  {
    key: "A",
    suffix: "6",
    positions: [{ positions: ["x", 0, 2, 2, 2, 2], fingerings: [0, 0, 1, 1, 1, 1], baseFret: 1, barres: [2] }],
  },
  {
    key: "A",
    suffix: "m6",
    positions: [{ positions: ["x", 0, 2, 2, 1, 2], fingerings: [0, 0, 2, 3, 1, 4], baseFret: 1 }],
  },
  {
    key: "A",
    suffix: "9",
    positions: [{ positions: ["x", 0, 2, 4, 2, 3], fingerings: [0, 0, 1, 3, 1, 2], baseFret: 1, barres: [2] }],
  },
  {
    key: "A",
    suffix: "sus2",
    positions: [{ positions: ["x", 0, 2, 2, 0, 0], fingerings: [0, 0, 1, 2, 0, 0], baseFret: 1 }],
  },
  {
    key: "A",
    suffix: "sus4",
    positions: [{ positions: ["x", 0, 2, 2, 3, 0], fingerings: [0, 0, 1, 2, 3, 0], baseFret: 1 }],
  },

  // Bb Chords
  {
    key: "Bb",
    suffix: "major",
    positions: [
      { positions: ["x", 1, 3, 3, 3, 1], fingerings: [0, 1, 2, 3, 4, 1], baseFret: 1, barres: [1] },
      { positions: [6, 8, 8, 7, 6, 6], fingerings: [1, 3, 4, 2, 1, 1], baseFret: 6, barres: [6] },
    ],
  },
  {
    key: "Bb",
    suffix: "minor",
    positions: [{ positions: ["x", 1, 3, 3, 2, 1], fingerings: [0, 1, 3, 4, 2, 1], baseFret: 1, barres: [1] }],
  },
  {
    key: "Bb",
    suffix: "7",
    positions: [{ positions: ["x", 1, 3, 1, 3, 1], fingerings: [0, 1, 3, 1, 4, 1], baseFret: 1, barres: [1] }],
  },
  {
    key: "Bb",
    suffix: "m7",
    positions: [{ positions: ["x", 1, 3, 1, 2, 1], fingerings: [0, 1, 3, 1, 2, 1], baseFret: 1, barres: [1] }],
  },
  {
    key: "Bb",
    suffix: "maj7",
    positions: [{ positions: ["x", 1, 3, 2, 3, 1], fingerings: [0, 1, 3, 2, 4, 1], baseFret: 1, barres: [1] }],
  },
  {
    key: "Bb",
    suffix: "dim",
    positions: [{ positions: ["x", 1, 2, 3, 2, "x"], fingerings: [0, 1, 2, 4, 3, 0], baseFret: 1 }],
  },
  {
    key: "Bb",
    suffix: "aug",
    positions: [{ positions: ["x", 1, 4, 3, 3, 2], fingerings: [0, 1, 4, 2, 3, 1], baseFret: 1 }],
  },
  {
    key: "Bb",
    suffix: "6",
    positions: [{ positions: ["x", 1, 3, 3, 3, 3], fingerings: [0, 1, 2, 2, 2, 2], baseFret: 1, barres: [3] }],
  },
  {
    key: "Bb",
    suffix: "m6",
    positions: [{ positions: ["x", 1, 3, 3, 2, 3], fingerings: [0, 1, 2, 3, 1, 4], baseFret: 1 }],
  },
  {
    key: "Bb",
    suffix: "9",
    positions: [{ positions: ["x", 1, 0, 1, 1, 1], fingerings: [0, 1, 0, 2, 3, 4], baseFret: 1 }],
  },
  {
    key: "Bb",
    suffix: "sus2",
    positions: [{ positions: ["x", 1, 3, 3, 1, 1], fingerings: [0, 1, 3, 4, 1, 1], baseFret: 1, barres: [1] }],
  },
  {
    key: "Bb",
    suffix: "sus4",
    positions: [{ positions: ["x", 1, 3, 3, 4, 1], fingerings: [0, 1, 2, 3, 4, 1], baseFret: 1, barres: [1] }],
  },

  // B Chords
  {
    key: "B",
    suffix: "major",
    positions: [
      { positions: ["x", 2, 4, 4, 4, 2], fingerings: [0, 1, 2, 3, 4, 1], baseFret: 1, barres: [2] },
      { positions: [7, 9, 9, 8, 7, 7], fingerings: [1, 3, 4, 2, 1, 1], baseFret: 7, barres: [7] },
    ],
  },
  {
    key: "B",
    suffix: "minor",
    positions: [{ positions: ["x", 2, 4, 4, 3, 2], fingerings: [0, 1, 3, 4, 2, 1], baseFret: 1, barres: [2] }],
  },
  {
    key: "B",
    suffix: "7",
    positions: [
      { positions: ["x", 2, 1, 2, 0, 2], fingerings: [0, 2, 1, 3, 0, 4], baseFret: 1 },
      { positions: ["x", 2, 4, 2, 4, 2], fingerings: [0, 1, 3, 1, 4, 1], baseFret: 1, barres: [2] },
    ],
  },
  {
    key: "B",
    suffix: "m7",
    positions: [
      { positions: ["x", 2, 0, 2, 0, 2], fingerings: [0, 1, 0, 2, 0, 3], baseFret: 1 },
      { positions: ["x", 2, 4, 2, 3, 2], fingerings: [0, 1, 3, 1, 2, 1], baseFret: 1, barres: [2] },
    ],
  },
  {
    key: "B",
    suffix: "maj7",
    positions: [{ positions: ["x", 2, 4, 3, 4, 2], fingerings: [0, 1, 3, 2, 4, 1], baseFret: 1, barres: [2] }],
  },
  {
    key: "B",
    suffix: "dim",
    positions: [{ positions: ["x", 2, 3, 4, 3, "x"], fingerings: [0, 1, 2, 4, 3, 0], baseFret: 1 }],
  },
  {
    key: "B",
    suffix: "aug",
    positions: [{ positions: ["x", 2, 5, 4, 4, 3], fingerings: [0, 1, 4, 2, 3, 1], baseFret: 1 }],
  },
  {
    key: "B",
    suffix: "6",
    positions: [{ positions: ["x", 2, 4, 4, 4, 4], fingerings: [0, 1, 2, 2, 2, 2], baseFret: 1, barres: [4] }],
  },
  {
    key: "B",
    suffix: "m6",
    positions: [{ positions: ["x", 2, 4, 4, 3, 4], fingerings: [0, 1, 2, 3, 1, 4], baseFret: 1 }],
  },
  {
    key: "B",
    suffix: "9",
    positions: [{ positions: ["x", 2, 1, 2, 2, 2], fingerings: [0, 2, 1, 3, 3, 3], baseFret: 1, barres: [2] }],
  },
  {
    key: "B",
    suffix: "sus2",
    positions: [{ positions: ["x", 2, 4, 4, 2, 2], fingerings: [0, 1, 3, 4, 1, 1], baseFret: 1, barres: [2] }],
  },
  {
    key: "B",
    suffix: "sus4",
    positions: [{ positions: ["x", 2, 4, 4, 5, 2], fingerings: [0, 1, 2, 3, 4, 1], baseFret: 1, barres: [2] }],
  },

  // C Chords
  {
    key: "C",
    suffix: "major",
    positions: [
      { positions: ["x", 3, 2, 0, 1, 0], fingerings: [0, 3, 2, 0, 1, 0], baseFret: 1 },
      { positions: [8, 10, 10, 9, 8, 8], fingerings: [1, 3, 4, 2, 1, 1], baseFret: 8, barres: [8] },
    ],
  },
  {
    key: "C",
    suffix: "minor",
    positions: [
      { positions: ["x", 3, 5, 5, 4, 3], fingerings: [0, 1, 3, 4, 2, 1], baseFret: 1, barres: [3] },
      { positions: ["x", 3, 1, 0, 1, 3], fingerings: [0, 3, 1, 0, 2, 4], baseFret: 1 },
    ],
  },
  {
    key: "C",
    suffix: "7",
    positions: [{ positions: ["x", 3, 2, 3, 1, 0], fingerings: [0, 3, 2, 4, 1, 0], baseFret: 1 }],
  },
  {
    key: "C",
    suffix: "m7",
    positions: [
      { positions: ["x", 3, 5, 3, 4, 3], fingerings: [0, 1, 3, 1, 2, 1], baseFret: 1, barres: [3] },
      { positions: ["x", 3, 1, 3, 1, 3], fingerings: [0, 2, 1, 3, 1, 4], baseFret: 1 },
    ],
  },
  {
    key: "C",
    suffix: "maj7",
    positions: [{ positions: ["x", 3, 2, 0, 0, 0], fingerings: [0, 2, 1, 0, 0, 0], baseFret: 1 }],
  },
  {
    key: "C",
    suffix: "dim",
    positions: [{ positions: ["x", 3, 4, 5, 4, "x"], fingerings: [0, 1, 2, 4, 3, 0], baseFret: 1 }],
  },
  {
    key: "C",
    suffix: "aug",
    positions: [{ positions: ["x", 3, 2, 1, 1, 0], fingerings: [0, 4, 3, 1, 2, 0], baseFret: 1 }],
  },
  {
    key: "C",
    suffix: "6",
    positions: [{ positions: ["x", 3, 2, 2, 1, 0], fingerings: [0, 4, 2, 3, 1, 0], baseFret: 1 }],
  },
  {
    key: "C",
    suffix: "m6",
    positions: [{ positions: ["x", 3, 1, 2, 1, 3], fingerings: [0, 3, 1, 2, 1, 4], baseFret: 1, barres: [1] }],
  },
  {
    key: "C",
    suffix: "9",
    positions: [{ positions: ["x", 3, 2, 3, 3, 3], fingerings: [0, 2, 1, 3, 3, 3], baseFret: 1, barres: [3] }],
  },
  {
    key: "C",
    suffix: "sus2",
    positions: [{ positions: ["x", 3, 0, 0, 1, 3], fingerings: [0, 2, 0, 0, 1, 3], baseFret: 1 }],
  },
  {
    key: "C",
    suffix: "sus4",
    positions: [{ positions: ["x", 3, 3, 0, 1, 1], fingerings: [0, 2, 3, 0, 1, 1], baseFret: 1 }],
  },

  // Db Chords
  {
    key: "Db",
    suffix: "major",
    positions: [
      { positions: ["x", 4, 6, 6, 6, 4], fingerings: [0, 1, 2, 3, 4, 1], baseFret: 1, barres: [4] },
      { positions: ["x", 4, 3, 1, 2, 1], fingerings: [0, 4, 3, 1, 2, 1], baseFret: 1, barres: [1] },
    ],
  },
  {
    key: "Db",
    suffix: "minor",
    positions: [{ positions: ["x", 4, 6, 6, 5, 4], fingerings: [0, 1, 3, 4, 2, 1], baseFret: 1, barres: [4] }],
  },
  {
    key: "Db",
    suffix: "7",
    positions: [{ positions: ["x", 4, 6, 4, 6, 4], fingerings: [0, 1, 3, 1, 4, 1], baseFret: 1, barres: [4] }],
  },
  {
    key: "Db",
    suffix: "m7",
    positions: [{ positions: ["x", 4, 6, 4, 5, 4], fingerings: [0, 1, 3, 1, 2, 1], baseFret: 1, barres: [4] }],
  },
  {
    key: "Db",
    suffix: "maj7",
    positions: [{ positions: ["x", 4, 6, 5, 6, 4], fingerings: [0, 1, 3, 2, 4, 1], baseFret: 1, barres: [4] }],
  },
  {
    key: "Db",
    suffix: "dim",
    positions: [{ positions: ["x", 4, 5, 6, 5, "x"], fingerings: [0, 1, 2, 4, 3, 0], baseFret: 1 }],
  },
  {
    key: "Db",
    suffix: "aug",
    positions: [{ positions: ["x", 4, 3, 2, 2, 1], fingerings: [0, 4, 3, 2, 2, 1], baseFret: 1 }],
  },
  {
    key: "Db",
    suffix: "6",
    positions: [{ positions: ["x", 4, 6, 6, 6, 6], fingerings: [0, 1, 2, 2, 2, 2], baseFret: 1, barres: [6] }],
  },
  {
    key: "Db",
    suffix: "m6",
    positions: [{ positions: ["x", 4, 6, 6, 5, 6], fingerings: [0, 1, 2, 3, 1, 4], baseFret: 1 }],
  },
  {
    key: "Db",
    suffix: "9",
    positions: [{ positions: ["x", 4, 3, 4, 4, 4], fingerings: [0, 2, 1, 3, 3, 3], baseFret: 1, barres: [4] }],
  },
  {
    key: "Db",
    suffix: "sus2",
    positions: [{ positions: ["x", 4, 6, 6, 4, 4], fingerings: [0, 1, 2, 3, 1, 1], baseFret: 1, barres: [4] }],
  },
  {
    key: "Db",
    suffix: "sus4",
    positions: [{ positions: ["x", 4, 6, 6, 7, 4], fingerings: [0, 1, 2, 3, 4, 1], baseFret: 1, barres: [4] }],
  },

  // D Chords
  {
    key: "D",
    suffix: "major",
    positions: [
      { positions: ["x", "x", 0, 2, 3, 2], fingerings: [0, 0, 0, 1, 3, 2], baseFret: 1 },
      { positions: ["x", 5, 7, 7, 7, 5], fingerings: [0, 1, 2, 3, 4, 1], baseFret: 1, barres: [5] },
    ],
  },
  {
    key: "D",
    suffix: "minor",
    positions: [
      { positions: ["x", "x", 0, 2, 3, 1], fingerings: [0, 0, 0, 2, 3, 1], baseFret: 1 },
      { positions: ["x", 5, 7, 7, 6, 5], fingerings: [0, 1, 3, 4, 2, 1], baseFret: 1, barres: [5] },
    ],
  },
  {
    key: "D",
    suffix: "7",
    positions: [{ positions: ["x", "x", 0, 2, 1, 2], fingerings: [0, 0, 0, 2, 1, 3], baseFret: 1 }],
  },
  {
    key: "D",
    suffix: "m7",
    positions: [{ positions: ["x", "x", 0, 2, 1, 1], fingerings: [0, 0, 0, 2, 1, 1], baseFret: 1, barres: [1] }],
  },
  {
    key: "D",
    suffix: "maj7",
    positions: [{ positions: ["x", "x", 0, 2, 2, 2], fingerings: [0, 0, 0, 1, 1, 1], baseFret: 1, barres: [2] }],
  },
  {
    key: "D",
    suffix: "dim",
    positions: [{ positions: ["x", "x", 0, 1, 3, 1], fingerings: [0, 0, 0, 1, 3, 2], baseFret: 1 }],
  },
  {
    key: "D",
    suffix: "aug",
    positions: [{ positions: ["x", "x", 0, 3, 3, 2], fingerings: [0, 0, 0, 2, 3, 1], baseFret: 1 }],
  },
  {
    key: "D",
    suffix: "6",
    positions: [{ positions: ["x", "x", 0, 2, 0, 2], fingerings: [0, 0, 0, 1, 0, 2], baseFret: 1 }],
  },
  {
    key: "D",
    suffix: "m6",
    positions: [{ positions: ["x", "x", 0, 2, 0, 1], fingerings: [0, 0, 0, 2, 0, 1], baseFret: 1 }],
  },
  {
    key: "D",
    suffix: "9",
    positions: [{ positions: ["x", "x", 0, 2, 1, 0], fingerings: [0, 0, 0, 2, 1, 0], baseFret: 1 }],
  },
  {
    key: "D",
    suffix: "sus2",
    positions: [{ positions: ["x", "x", 0, 2, 3, 0], fingerings: [0, 0, 0, 1, 2, 0], baseFret: 1 }],
  },
  {
    key: "D",
    suffix: "sus4",
    positions: [{ positions: ["x", "x", 0, 2, 3, 3], fingerings: [0, 0, 0, 1, 2, 3], baseFret: 1 }],
  },

  // Eb Chords
  {
    key: "Eb",
    suffix: "major",
    positions: [
      { positions: ["x", 6, 8, 8, 8, 6], fingerings: [0, 1, 2, 3, 4, 1], baseFret: 6, barres: [6] },
      { positions: ["x", "x", 1, 3, 4, 3], fingerings: [0, 0, 1, 2, 4, 3], baseFret: 1 },
    ],
  },
  {
    key: "Eb",
    suffix: "minor",
    positions: [{ positions: ["x", 6, 8, 8, 7, 6], fingerings: [0, 1, 3, 4, 2, 1], baseFret: 6, barres: [6] }],
  },
  {
    key: "Eb",
    suffix: "7",
    positions: [{ positions: ["x", 6, 8, 6, 8, 6], fingerings: [0, 1, 3, 1, 4, 1], baseFret: 6, barres: [6] }],
  },
  {
    key: "Eb",
    suffix: "m7",
    positions: [{ positions: ["x", 6, 8, 6, 7, 6], fingerings: [0, 1, 3, 1, 2, 1], baseFret: 6, barres: [6] }],
  },
  {
    key: "Eb",
    suffix: "maj7",
    positions: [{ positions: ["x", 6, 8, 7, 8, 6], fingerings: [0, 1, 3, 2, 4, 1], baseFret: 6, barres: [6] }],
  },
  {
    key: "Eb",
    suffix: "dim",
    positions: [{ positions: ["x", "x", 1, 2, 4, 2], fingerings: [0, 0, 1, 2, 4, 3], baseFret: 1 }],
  },
  {
    key: "Eb",
    suffix: "aug",
    positions: [{ positions: ["x", "x", 1, 4, 4, 3], fingerings: [0, 0, 1, 3, 4, 2], baseFret: 1 }],
  },
  {
    key: "Eb",
    suffix: "6",
    positions: [{ positions: ["x", "x", 1, 3, 1, 3], fingerings: [0, 0, 1, 3, 1, 4], baseFret: 1, barres: [1] }],
  },
  {
    key: "Eb",
    suffix: "m6",
    positions: [{ positions: ["x", "x", 1, 3, 1, 2], fingerings: [0, 0, 1, 3, 1, 2], baseFret: 1, barres: [1] }],
  },
  {
    key: "Eb",
    suffix: "9",
    positions: [{ positions: ["x", 6, 5, 6, 6, 6], fingerings: [0, 2, 1, 3, 3, 3], baseFret: 5, barres: [6] }],
  },
  {
    key: "Eb",
    suffix: "sus2",
    positions: [{ positions: ["x", 6, 8, 8, 6, 6], fingerings: [0, 1, 3, 4, 1, 1], baseFret: 6, barres: [6] }],
  },
  {
    key: "Eb",
    suffix: "sus4",
    positions: [{ positions: ["x", 6, 8, 8, 9, 6], fingerings: [0, 1, 2, 3, 4, 1], baseFret: 6, barres: [6] }],
  },

  // E Chords
  {
    key: "E",
    suffix: "major",
    positions: [{ positions: [0, 2, 2, 1, 0, 0], fingerings: [0, 2, 3, 1, 0, 0], baseFret: 1 }],
  },
  {
    key: "E",
    suffix: "minor",
    positions: [{ positions: [0, 2, 2, 0, 0, 0], fingerings: [0, 2, 3, 0, 0, 0], baseFret: 1 }],
  },
  {
    key: "E",
    suffix: "7",
    positions: [
      { positions: [0, 2, 0, 1, 0, 0], fingerings: [0, 2, 0, 1, 0, 0], baseFret: 1 },
      { positions: [0, 2, 2, 1, 3, 0], fingerings: [0, 2, 3, 1, 4, 0], baseFret: 1 },
    ],
  },
  {
    key: "E",
    suffix: "m7",
    positions: [
      { positions: [0, 2, 0, 0, 0, 0], fingerings: [0, 2, 0, 0, 0, 0], baseFret: 1 },
      { positions: [0, 2, 2, 0, 3, 0], fingerings: [0, 1, 2, 0, 3, 0], baseFret: 1 },
    ],
  },
  {
    key: "E",
    suffix: "maj7",
    positions: [{ positions: [0, 2, 1, 1, 0, 0], fingerings: [0, 3, 1, 2, 0, 0], baseFret: 1 }],
  },
  {
    key: "E",
    suffix: "dim",
    positions: [{ positions: [0, 1, 2, 0, "x", "x"], fingerings: [0, 1, 2, 0, 0, 0], baseFret: 1 }],
  },
  {
    key: "E",
    suffix: "aug",
    positions: [{ positions: [0, 3, 2, 1, 1, 0], fingerings: [0, 4, 3, 1, 2, 0], baseFret: 1 }],
  },
  {
    key: "E",
    suffix: "6",
    positions: [{ positions: [0, 2, 2, 1, 2, 0], fingerings: [0, 2, 3, 1, 4, 0], baseFret: 1 }],
  },
  {
    key: "E",
    suffix: "m6",
    positions: [{ positions: [0, 2, 2, 0, 2, 0], fingerings: [0, 1, 2, 0, 3, 0], baseFret: 1 }],
  },
  {
    key: "E",
    suffix: "9",
    positions: [{ positions: [0, 2, 0, 1, 0, 2], fingerings: [0, 2, 0, 1, 0, 3], baseFret: 1 }],
  },
  {
    key: "E",
    suffix: "sus2",
    positions: [{ positions: [0, 2, 4, 4, 0, 0], fingerings: [0, 1, 3, 4, 0, 0], baseFret: 1 }],
  },
  {
    key: "E",
    suffix: "sus4",
    positions: [{ positions: [0, 2, 2, 2, 0, 0], fingerings: [0, 1, 2, 3, 0, 0], baseFret: 1 }],
  },

  // F Chords
  {
    key: "F",
    suffix: "major",
    positions: [
      { positions: [1, 3, 3, 2, 1, 1], fingerings: [1, 3, 4, 2, 1, 1], baseFret: 1, barres: [1] },
      { positions: ["x", "x", 3, 2, 1, 1], fingerings: [0, 0, 3, 2, 1, 1], baseFret: 1, barres: [1] },
    ],
  },
  {
    key: "F",
    suffix: "minor",
    positions: [{ positions: [1, 3, 3, 1, 1, 1], fingerings: [1, 3, 4, 1, 1, 1], baseFret: 1, barres: [1] }],
  },
  {
    key: "F",
    suffix: "7",
    positions: [{ positions: [1, 3, 1, 2, 1, 1], fingerings: [1, 3, 1, 2, 1, 1], baseFret: 1, barres: [1] }],
  },
  {
    key: "F",
    suffix: "m7",
    positions: [{ positions: [1, 3, 1, 1, 1, 1], fingerings: [1, 3, 1, 1, 1, 1], baseFret: 1, barres: [1] }],
  },
  {
    key: "F",
    suffix: "maj7",
    positions: [
      { positions: ["x", "x", 3, 2, 1, 0], fingerings: [0, 0, 3, 2, 1, 0], baseFret: 1 },
      { positions: [1, 3, 2, 2, 1, 1], fingerings: [1, 4, 2, 3, 1, 1], baseFret: 1, barres: [1] },
    ],
  },
  {
    key: "F",
    suffix: "dim",
    positions: [{ positions: ["x", "x", 3, 4, 3, 1], fingerings: [0, 0, 2, 3, 2, 1], baseFret: 1, barres: [3] }],
  },
  {
    key: "F",
    suffix: "aug",
    positions: [{ positions: ["x", "x", 3, 2, 2, 1], fingerings: [0, 0, 4, 2, 3, 1], baseFret: 1 }],
  },
  {
    key: "F",
    suffix: "6",
    positions: [{ positions: ["x", "x", 3, 2, 3, 1], fingerings: [0, 0, 2, 1, 3, 1], baseFret: 1, barres: [1] }],
  },
  {
    key: "F",
    suffix: "m6",
    positions: [{ positions: ["x", "x", 3, 1, 3, 1], fingerings: [0, 0, 3, 1, 4, 1], baseFret: 1, barres: [1] }],
  },
  {
    key: "F",
    suffix: "9",
    positions: [{ positions: [1, 0, 1, 0, 1, 3], fingerings: [1, 0, 2, 0, 3, 4], baseFret: 1 }],
  },
  {
    key: "F",
    suffix: "sus2",
    positions: [{ positions: ["x", "x", 3, 0, 1, 1], fingerings: [0, 0, 3, 0, 1, 1], baseFret: 1, barres: [1] }],
  },
  {
    key: "F",
    suffix: "sus4",
    positions: [{ positions: [1, 3, 3, 3, 1, 1], fingerings: [1, 2, 3, 4, 1, 1], baseFret: 1, barres: [1] }],
  },

  // Gb Chords
  {
    key: "Gb",
    suffix: "major",
    positions: [{ positions: [2, 4, 4, 3, 2, 2], fingerings: [1, 3, 4, 2, 1, 1], baseFret: 1, barres: [2] }],
  },
  {
    key: "Gb",
    suffix: "minor",
    positions: [{ positions: [2, 4, 4, 2, 2, 2], fingerings: [1, 3, 4, 1, 1, 1], baseFret: 1, barres: [2] }],
  },
  {
    key: "Gb",
    suffix: "7",
    positions: [{ positions: [2, 4, 2, 3, 2, 2], fingerings: [1, 3, 1, 2, 1, 1], baseFret: 1, barres: [2] }],
  },
  {
    key: "Gb",
    suffix: "m7",
    positions: [{ positions: [2, 4, 2, 2, 2, 2], fingerings: [1, 3, 1, 1, 1, 1], baseFret: 1, barres: [2] }],
  },
  {
    key: "Gb",
    suffix: "maj7",
    positions: [{ positions: [2, 4, 3, 3, 2, 2], fingerings: [1, 4, 2, 3, 1, 1], baseFret: 1, barres: [2] }],
  },
  {
    key: "Gb",
    suffix: "dim",
    positions: [{ positions: ["x", "x", 4, 5, 4, 2], fingerings: [0, 0, 2, 3, 2, 1], baseFret: 1, barres: [4] }],
  },
  {
    key: "Gb",
    suffix: "aug",
    positions: [{ positions: ["x", "x", 4, 3, 3, 2], fingerings: [0, 0, 4, 2, 3, 1], baseFret: 1 }],
  },
  {
    key: "Gb",
    suffix: "6",
    positions: [{ positions: ["x", "x", 4, 3, 4, 2], fingerings: [0, 0, 2, 1, 3, 1], baseFret: 1, barres: [2] }],
  },
  {
    key: "Gb",
    suffix: "m6",
    positions: [{ positions: ["x", "x", 4, 2, 4, 2], fingerings: [0, 0, 3, 1, 4, 1], baseFret: 1, barres: [2] }],
  },
  {
    key: "Gb",
    suffix: "9",
    positions: [{ positions: [2, 1, 2, 1, 2, 4], fingerings: [2, 1, 3, 1, 4, 4], baseFret: 1, barres: [1] }],
  },
  {
    key: "Gb",
    suffix: "sus2",
    positions: [{ positions: ["x", "x", 4, 1, 2, 2], fingerings: [0, 0, 4, 1, 2, 3], baseFret: 1 }],
  },
  {
    key: "Gb",
    suffix: "sus4",
    positions: [{ positions: [2, 4, 4, 4, 2, 2], fingerings: [1, 2, 3, 4, 1, 1], baseFret: 1, barres: [2] }],
  },

  // G Chords
  {
    key: "G",
    suffix: "major",
    positions: [
      { positions: [3, 2, 0, 0, 0, 3], fingerings: [2, 1, 0, 0, 0, 3], baseFret: 1 },
      { positions: [3, 2, 0, 0, 3, 3], fingerings: [2, 1, 0, 0, 3, 4], baseFret: 1 },
    ],
  },
  {
    key: "G",
    suffix: "minor",
    positions: [{ positions: [3, 5, 5, 3, 3, 3], fingerings: [1, 3, 4, 1, 1, 1], baseFret: 1, barres: [3] }],
  },
  {
    key: "G",
    suffix: "7",
    positions: [{ positions: [3, 2, 0, 0, 0, 1], fingerings: [3, 2, 0, 0, 0, 1], baseFret: 1 }],
  },
  {
    key: "G",
    suffix: "m7",
    positions: [{ positions: [3, 5, 3, 3, 3, 3], fingerings: [1, 3, 1, 1, 1, 1], baseFret: 1, barres: [3] }],
  },
  {
    key: "G",
    suffix: "maj7",
    positions: [{ positions: [3, 2, 0, 0, 0, 2], fingerings: [2, 1, 0, 0, 0, 3], baseFret: 1 }],
  },
  {
    key: "G",
    suffix: "dim",
    positions: [{ positions: ["x", "x", 5, 6, 5, 3], fingerings: [0, 0, 2, 3, 2, 1], baseFret: 1, barres: [5] }],
  },
  {
    key: "G",
    suffix: "aug",
    positions: [{ positions: [3, 2, 1, 0, 0, 3], fingerings: [3, 2, 1, 0, 0, 4], baseFret: 1 }],
  },
  {
    key: "G",
    suffix: "6",
    positions: [{ positions: [3, 2, 0, 0, 0, 0], fingerings: [2, 1, 0, 0, 0, 0], baseFret: 1 }],
  },
  {
    key: "G",
    suffix: "m6",
    positions: [{ positions: [3, 5, 3, 3, 3, 0], fingerings: [1, 3, 1, 1, 1, 0], baseFret: 1, barres: [3] }],
  },
  {
    key: "G",
    suffix: "9",
    positions: [{ positions: [3, 0, 0, 2, 0, 1], fingerings: [3, 0, 0, 2, 0, 1], baseFret: 1 }],
  },
  {
    key: "G",
    suffix: "sus2",
    positions: [{ positions: [3, 0, 0, 0, 3, 3], fingerings: [1, 0, 0, 0, 2, 3], baseFret: 1 }],
  },
  {
    key: "G",
    suffix: "sus4",
    positions: [{ positions: [3, 5, 5, 5, 3, 3], fingerings: [1, 2, 3, 4, 1, 1], baseFret: 1, barres: [3] }],
  },

  // Ab Chords
  {
    key: "Ab",
    suffix: "major",
    positions: [{ positions: [4, 6, 6, 5, 4, 4], fingerings: [1, 3, 4, 2, 1, 1], baseFret: 1, barres: [4] }],
  },
  {
    key: "Ab",
    suffix: "minor",
    positions: [{ positions: [4, 6, 6, 4, 4, 4], fingerings: [1, 3, 4, 1, 1, 1], baseFret: 1, barres: [4] }],
  },
  {
    key: "Ab",
    suffix: "7",
    positions: [{ positions: [4, 6, 4, 5, 4, 4], fingerings: [1, 3, 1, 2, 1, 1], baseFret: 1, barres: [4] }],
  },
  {
    key: "Ab",
    suffix: "m7",
    positions: [{ positions: [4, 6, 4, 4, 4, 4], fingerings: [1, 3, 1, 1, 1, 1], baseFret: 1, barres: [4] }],
  },
  {
    key: "Ab",
    suffix: "maj7",
    positions: [{ positions: [4, 6, 5, 5, 4, 4], fingerings: [1, 4, 2, 3, 1, 1], baseFret: 1, barres: [4] }],
  },
  {
    key: "Ab",
    suffix: "dim",
    positions: [{ positions: ["x", "x", 6, 7, 6, 4], fingerings: [0, 0, 2, 3, 2, 1], baseFret: 1, barres: [6] }],
  },
  {
    key: "Ab",
    suffix: "aug",
    positions: [{ positions: [4, 3, 2, 1, 1, 0], fingerings: [4, 3, 2, 1, 1, 0], baseFret: 1, barres: [1] }],
  },
  {
    key: "Ab",
    suffix: "6",
    positions: [{ positions: ["x", "x", 6, 5, 6, 4], fingerings: [0, 0, 2, 1, 3, 1], baseFret: 1, barres: [4] }],
  },
  {
    key: "Ab",
    suffix: "m6",
    positions: [{ positions: ["x", "x", 6, 4, 6, 4], fingerings: [0, 0, 3, 1, 4, 1], baseFret: 1, barres: [4] }],
  },
  {
    key: "Ab",
    suffix: "9",
    positions: [{ positions: [4, 3, 4, 3, 4, 6], fingerings: [2, 1, 3, 1, 4, 4], baseFret: 1, barres: [3] }],
  },
  {
    key: "Ab",
    suffix: "sus2",
    positions: [{ positions: [4, 6, 6, 3, 4, 4], fingerings: [1, 3, 4, 1, 1, 1], baseFret: 1, barres: [4] }],
  },
  {
    key: "Ab",
    suffix: "sus4",
    positions: [{ positions: [4, 6, 6, 6, 4, 4], fingerings: [1, 2, 3, 4, 1, 1], baseFret: 1, barres: [4] }],
  },
]

// Helper function to get chords by root note
export function getChordsByKey(key: string): Chord[] {
  return chordDatabase.filter((chord) => chord.key === key)
}

// Helper function to get chord by key and suffix
export function getChord(key: string, suffix: string): Chord | undefined {
  return chordDatabase.find((chord) => chord.key === key && chord.suffix === suffix)
}

// Helper function to search chords
export function searchChords(query: string): Chord[] {
  const lowerQuery = query.toLowerCase().trim()

  // Normalize the query to handle common variations
  let normalizedQuery = lowerQuery

  // Handle "flat" variations (e.g., "b flat" -> "bb", "d flat" -> "db")
  normalizedQuery = normalizedQuery.replace(/([a-g])\s*flat/g, "$1b")

  // Handle "sharp" variations (e.g., "c sharp" -> "c#", "f sharp" -> "f#")
  normalizedQuery = normalizedQuery.replace(/([a-g])\s*sharp/g, "$1#")

  // Handle "#" or "b" without spaces (already covered, but make explicit)
  normalizedQuery = normalizedQuery.replace(/\s+/g, "")

  return chordDatabase.filter((chord) => {
    const fullName = `${chord.key}${chord.suffix}`.toLowerCase()
    const displayName = `${chord.key} ${chord.suffix}`.toLowerCase()
    const keyOnly = chord.key.toLowerCase()

    // Check if the normalized query matches
    return (
      fullName.includes(normalizedQuery) ||
      displayName.includes(normalizedQuery) ||
      keyOnly.includes(normalizedQuery) ||
      fullName.includes(lowerQuery) ||
      displayName.includes(lowerQuery)
    )
  })
}

// Get note color class
export function getNoteColorClass(key: string): string {
  const baseNote = key.replace(/[#b]/g, "").charAt(0).toUpperCase()
  const colorMap: Record<string, string> = {
    A: "bg-note-a",
    B: "bg-note-b",
    C: "bg-note-c",
    D: "bg-note-d",
    E: "bg-note-e",
    F: "bg-note-f",
    G: "bg-note-g",
  }
  return colorMap[baseNote] || "bg-primary"
}

// Get note text color for contrast
export function getNoteTextColorClass(key: string): string {
  const baseNote = key.replace(/[#b]/g, "").charAt(0).toUpperCase()
  // Dark text for lighter backgrounds, light text for darker
  const darkTextNotes = ["B", "C", "D", "G"]
  return darkTextNotes.includes(baseNote) ? "text-foreground" : "text-primary-foreground"
}

export function getNoteHexColor(key: string): string {
  const baseNote = key.replace(/[#b]/g, "").charAt(0).toUpperCase()
  const colorMap: Record<string, string> = {
    A: "#ef4444", // red-500
    B: "#f97316", // orange-500
    C: "#eab308", // yellow-500
    D: "#22c55e", // green-500
    E: "#06b6d4", // cyan-500
    F: "#3b82f6", // blue-500
    G: "#a855f7", // purple-500
  }
  return colorMap[baseNote] || "#ef4444"
}

export function getNoteContrastColor(key: string): string {
  return "#ffffff"
}

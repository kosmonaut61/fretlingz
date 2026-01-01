// Audio synthesis utility for playing guitar chords using Web Audio API
// Based on the Karplus-Strong algorithm for realistic string sounds

const SAMPLE_RATE = 44100
const SOUND_DURATION = 2.5 // seconds

// Standard guitar tuning frequencies (Hz) from low E to high E
const STANDARD_TUNING = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63]

// Calculate frequency for a given fret on a string
function getFretFrequency(openStringHz: number, fret: number): number {
  // Each fret is a semitone, frequency multiplies by 2^(1/12) per semitone
  return openStringHz * Math.pow(2, fret / 12)
}

// Karplus-Strong string synthesis algorithm
class GuitarString {
  private buffer: Float32Array
  private bufferSize: number
  private index: number

  constructor(frequency: number) {
    // Buffer size determines the pitch
    this.bufferSize = Math.round(SAMPLE_RATE / frequency)
    this.buffer = new Float32Array(this.bufferSize)
    this.index = 0

    // Initialize buffer with white noise
    for (let i = 0; i < this.bufferSize; i++) {
      this.buffer[i] = Math.random() * 2 - 1
    }
  }

  // Get current sample
  sample(): number {
    return this.buffer[this.index]
  }

  // Advance to next sample with averaging (creates decay)
  tic(): void {
    const nextIndex = (this.index + 1) % this.bufferSize
    // Average current and next sample, with decay factor
    this.buffer[this.index] = (this.buffer[this.index] + this.buffer[nextIndex]) * 0.496
    this.index = nextIndex
  }
}

// Play a single string note
function synthesizeString(frequency: number, delay = 0): Float32Array {
  const string = new GuitarString(frequency)
  const bufferSize = Math.floor(SAMPLE_RATE * SOUND_DURATION)
  const soundBuffer = new Float32Array(bufferSize)

  const startSample = Math.floor(delay * SAMPLE_RATE)

  for (let i = 0; i < bufferSize; i++) {
    if (i >= startSample) {
      soundBuffer[i] = string.sample()
      string.tic()
    }
  }

  return soundBuffer
}

// Mix multiple audio buffers together
function mixBuffers(buffers: Float32Array[]): Float32Array {
  if (buffers.length === 0) return new Float32Array(0)

  const bufferSize = buffers[0].length
  const mixed = new Float32Array(bufferSize)

  for (const buffer of buffers) {
    for (let i = 0; i < bufferSize; i++) {
      mixed[i] += buffer[i] / buffers.length // Normalize to prevent clipping
    }
  }

  return mixed
}

let globalAudioContext: AudioContext | null = null
let isAudioUnlocked = false

function getAudioContext(): AudioContext {
  if (!globalAudioContext) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) {
      throw new Error("Web Audio API not supported")
    }
    globalAudioContext = new AudioContextClass({ sampleRate: SAMPLE_RATE })
    console.log("[v0] AudioContext created, state:", globalAudioContext.state)
  }

  return globalAudioContext
}

// Unlock audio context for iOS (must be called from user gesture)
async function unlockAudioContext(): Promise<void> {
  if (isAudioUnlocked) return

  try {
    const audioCtx = getAudioContext()
    console.log("[v0] Unlocking AudioContext, current state:", audioCtx.state)

    if (audioCtx.state === "suspended") {
      await audioCtx.resume()
      console.log("[v0] AudioContext resumed, new state:", audioCtx.state)
    }

    // Play a silent buffer to fully unlock iOS audio
    const buffer = audioCtx.createBuffer(1, 1, SAMPLE_RATE)
    const source = audioCtx.createBufferSource()
    source.buffer = buffer
    source.connect(audioCtx.destination)
    source.start(0)

    isAudioUnlocked = true
    console.log("[v0] Audio unlocked successfully")
  } catch (error) {
    console.error("[v0] Error unlocking audio:", error)
  }
}

export async function initAudioContext(): Promise<void> {
  await unlockAudioContext()
}

// Play a chord from fret positions
export async function playChord(positions: (number | "x")[]): Promise<void> {
  try {
    console.log("[v0] playChord called with positions:", positions)

    // Unlock audio on first interaction (iOS requirement)
    await unlockAudioContext()

    const audioCtx = getAudioContext()
    console.log("[v0] AudioContext state before playback:", audioCtx.state)

    // Ensure context is running
    if (audioCtx.state === "suspended") {
      await audioCtx.resume()
      console.log("[v0] Resumed suspended context, new state:", audioCtx.state)
    }

    // Generate audio for each string synchronously
    const stringBuffers: Float32Array[] = []
    const staggerDelay = 0.03

    positions.forEach((fret, stringIndex) => {
      if (fret === "x") return

      const openStringFreq = STANDARD_TUNING[stringIndex]
      const frequency = fret === 0 ? openStringFreq : getFretFrequency(openStringFreq, fret)

      const delay = stringIndex * staggerDelay
      const stringBuffer = synthesizeString(frequency, delay)
      stringBuffers.push(stringBuffer)
    })

    console.log("[v0] Generated", stringBuffers.length, "string buffers")

    if (stringBuffers.length === 0) {
      console.log("[v0] No strings to play")
      return
    }

    // Mix all strings together
    const mixedBuffer = mixBuffers(stringBuffers)
    console.log("[v0] Mixed buffer length:", mixedBuffer.length)

    // Create audio buffer and play immediately (synchronous to user gesture)
    const audioBuffer = audioCtx.createBuffer(1, mixedBuffer.length, SAMPLE_RATE)
    audioBuffer.copyToChannel(mixedBuffer, 0)

    const source = audioCtx.createBufferSource()
    source.buffer = audioBuffer

    const gainNode = audioCtx.createGain()
    gainNode.gain.value = 0.7

    source.connect(gainNode)
    gainNode.connect(audioCtx.destination)

    // Start playback immediately
    source.start(0)
    console.log("[v0] Audio playback started")

    // Detect if audio is actually playing by checking if time is advancing
    setTimeout(() => {
      if (audioCtx.currentTime === 0) {
        // Audio didn't start - likely iOS silent mode
        console.warn("[v0] Audio may be blocked - check device silent switch on iOS")
      }
    }, 100)
  } catch (error) {
    console.error("[v0] Error playing chord:", error)
  }
}

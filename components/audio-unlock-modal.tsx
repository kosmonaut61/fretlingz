"use client"

import { useState, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { initAudioContext } from "@/lib/audio-synth"

export function AudioUnlockModal() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Check if user has already unlocked audio in this session
    const hasUnlockedAudio = sessionStorage.getItem("audioUnlocked")

    // Detect iOS/Safari
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

    // Show modal for iOS/Safari users who haven't unlocked audio yet
    if ((isIOS || isSafari) && !hasUnlockedAudio) {
      setShowModal(true)
    }
  }, [])

  const handleEnableAudio = async () => {
    try {
      // Initialize and unlock audio context
      await initAudioContext()

      // Mark audio as unlocked in session storage
      sessionStorage.setItem("audioUnlocked", "true")

      // Close modal
      setShowModal(false)
    } catch (error) {
      console.error("[v0] Failed to unlock audio:", error)
    }
  }

  if (!showModal) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="neumorphic rounded-3xl p-8 max-w-sm mx-4 text-center space-y-4">
        <div className="neumorphic-inset rounded-full w-16 h-16 mx-auto flex items-center justify-center">
          <Volume2 className="w-8 h-8 text-primary" />
        </div>

        <h2 className="text-xl font-semibold">Enable Chord Sounds</h2>

        <p className="text-sm text-muted-foreground">
          Tap the button below to enable audio playback for guitar chords.
        </p>

        <div className="neumorphic-inset rounded-2xl p-4 text-left space-y-2">
          <div className="flex items-start gap-2">
            <VolumeX className="w-4 h-4 mt-0.5 text-orange-500 flex-shrink-0" />
            <div className="text-xs text-muted-foreground">
              <strong className="text-foreground">iOS Users:</strong> Make sure your device&apos;s silent/mute switch is
              OFF. Web Audio requires the ringer to be enabled to play through the speaker.
            </div>
          </div>
        </div>

        <button
          onClick={handleEnableAudio}
          className="neumorphic rounded-full px-8 py-3 text-base font-medium hover:neumorphic-pressed transition-all w-full"
        >
          Enable Sound
        </button>

        <button
          onClick={() => {
            sessionStorage.setItem("audioUnlocked", "skip")
            setShowModal(false)
          }}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip for now
        </button>
      </div>
    </div>
  )
}

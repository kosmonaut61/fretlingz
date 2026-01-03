"use client"

import { useState, useEffect } from "react"
import { Sparkles, Volume2 } from "lucide-react"
import { initAudioContext } from "@/lib/audio-synth"

export function FretlingsSplash() {
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    // Check if user has already seen the splash screen in this session
    const hasSeenSplash = sessionStorage.getItem("fretlingsSplashSeen")

    if (!hasSeenSplash) {
      setShowSplash(true)
    }
  }, [])

  const handleStart = async () => {
    try {
      // Initialize and unlock audio context (required for the game)
      await initAudioContext()

      // Mark splash as seen in session storage
      sessionStorage.setItem("fretlingsSplashSeen", "true")

      // Close splash screen
      setShowSplash(false)
    } catch (error) {
      console.error("[Fretlings] Failed to initialize audio:", error)
      // Still close the splash even if audio fails
      sessionStorage.setItem("fretlingsSplashSeen", "true")
      setShowSplash(false)
    }
  }

  if (!showSplash) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="neumorphic rounded-lg p-10 max-w-md mx-4 text-center space-y-6">
        {/* Logo/Title Area */}
        <div className="space-y-3">
          <div className="neumorphic-inset rounded-lg p-6 flex items-center justify-center relative">
            <Sparkles className="w-12 h-12 text-primary absolute -top-2 -right-2 animate-pulse" />
            <h1 className="text-5xl font-bold text-primary">
              Fretlings
            </h1>
          </div>
          
          <p className="text-lg font-medium text-foreground">
            Collect. Play. Conquer.
          </p>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            Open packs of chord creatures and master guitar chords through battle! 
            Play chords correctly to collect your Fretlings and use them to defeat monsters.
          </p>
        </div>

        {/* Audio Info */}
        <div className="neumorphic-inset rounded-lg p-4 text-left space-y-2">
          <div className="flex items-start gap-2">
            <Volume2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
            <div className="text-xs text-muted-foreground">
              <strong className="text-foreground">Audio Required:</strong> Fretlings uses audio 
              to verify chord accuracy. Make sure your device&apos;s volume is on.
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="neumorphic rounded-lg px-10 py-4 text-lg font-semibold hover:neumorphic-pressed transition-all w-full bg-primary text-primary-foreground"
        >
          Begin Your Journey
        </button>
      </div>
    </div>
  )
}


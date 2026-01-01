"use client"

import { useEffect, useState } from "react"
import { Search, X } from "lucide-react"
import { searchChords } from "@/lib/chord-data"

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
}

export function CommandPalette({ isOpen, onClose, value, onChange, onSubmit }: CommandPaletteProps) {
  const [localValue, setLocalValue] = useState(value)
  const [previewResults, setPreviewResults] = useState<any[]>([])

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    if (localValue) {
      const results = searchChords(localValue)
      setPreviewResults(results.slice(0, 5))
    } else {
      setPreviewResults([])
    }
  }, [localValue])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onClose()
      }
      if (e.key === "Escape") {
        onClose()
      }
      if (e.key === "Enter" && isOpen) {
        e.preventDefault()
        onChange(localValue)
        onSubmit()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [onClose, isOpen, localValue, onChange, onSubmit])

  const handleChange = (newValue: string) => {
    setLocalValue(newValue)
    onChange(newValue)
  }

  const handleClear = () => {
    setLocalValue("")
    onChange("")
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/30 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg mx-4 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-top-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            value={localValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search chords... (e.g., Am, G7, Cmaj7)"
            className="flex-1 bg-transparent outline-none text-base placeholder:text-muted-foreground"
            autoFocus
          />
          {localValue && (
            <button
              onClick={handleClear}
              className="p-1 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {previewResults.length > 0 && (
          <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
            <div className="px-2 py-2">
              <p className="px-3 py-2 text-xs text-muted-foreground font-medium">
                Found {previewResults.length > 5 ? "5+" : previewResults.length} result
                {previewResults.length !== 1 ? "s" : ""}
              </p>
              {previewResults.map((chord, index) => (
                <button
                  key={`${chord.key}-${chord.suffix}-${index}`}
                  onClick={() => {
                    onChange(localValue)
                    onSubmit()
                  }}
                  className="w-full px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left flex items-center gap-3"
                >
                  <span className="text-sm font-medium">
                    {chord.key}
                    {chord.suffix}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {chord.key} {chord.suffix === "" ? "Major" : chord.suffix}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="px-4 py-3 text-sm text-muted-foreground border-t border-border">
          <div className="flex items-center justify-between">
            <span>{localValue ? "Press Enter to search" : "Type to search chords"}</span>
            <kbd className="px-2 py-1 text-xs bg-muted rounded border border-border">ESC</kbd>
          </div>
        </div>

        <div className="px-4 py-2 bg-muted/30 text-xs text-muted-foreground flex items-center justify-between">
          <span>Press ⌘K to toggle</span>
          <span className="text-primary">Try: "Am", "G7", "b flat"</span>
        </div>
      </div>
    </div>
  )
}

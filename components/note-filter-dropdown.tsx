"use client"

import { useState, useRef, useEffect } from "react"
import { ROOT_NOTES, getNoteHexColor } from "@/lib/chord-data"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface NoteFilterDropdownProps {
  selectedNote: string | null
  onSelectNote: (note: string | null) => void
}

export function NoteFilterDropdown({ selectedNote, onSelectNote }: NoteFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (note: string | null) => {
    onSelectNote(note)
    setIsOpen(false)
  }

  const displayText = selectedNote || "All Notes"
  const noteColor = selectedNote ? getNoteHexColor(selectedNote) : undefined

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="neumorphic rounded-full px-4 py-2 text-sm font-medium transition-all active:scale-95 flex items-center gap-2 min-w-[120px] justify-between"
        style={{
          color: noteColor,
          borderColor: noteColor,
          borderWidth: noteColor ? 2 : 0,
        }}
      >
        <span>{displayText}</span>
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 neumorphic rounded-2xl p-2 bg-background border border-border shadow-lg z-20 min-w-[200px]">
          <div className="max-h-[300px] overflow-y-auto space-y-1">
            <button
              onClick={() => handleSelect(null)}
              className={cn(
                "w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition-all",
                selectedNote === null ? "bg-primary/10 text-primary" : "hover:bg-muted",
              )}
            >
              All Notes
            </button>
            {ROOT_NOTES.map((note) => {
              const color = getNoteHexColor(note)
              const isSelected = selectedNote === note

              return (
                <button
                  key={note}
                  onClick={() => handleSelect(note)}
                  className={cn(
                    "w-full text-left rounded-lg px-3 py-2 text-sm font-semibold transition-all",
                    isSelected && "ring-2",
                  )}
                  style={{
                    backgroundColor: isSelected ? color : undefined,
                    color: isSelected ? "#ffffff" : color,
                    ringColor: color,
                  }}
                >
                  {note}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

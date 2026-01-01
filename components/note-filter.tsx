"use client"

import { ROOT_NOTES, getNoteHexColor } from "@/lib/chord-data"
import { cn } from "@/lib/utils"

interface NoteFilterProps {
  selectedNote: string | null
  onSelectNote: (note: string | null) => void
}

export function NoteFilter({ selectedNote, onSelectNote }: NoteFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onSelectNote(null)}
        className={cn(
          "neumorphic rounded-full px-4 py-2 text-sm font-medium transition-all active:scale-95",
          selectedNote === null ? "neumorphic-pressed text-primary" : "hover:neumorphic-pressed",
        )}
      >
        All
      </button>
      {ROOT_NOTES.map((note) => {
        const noteColor = getNoteHexColor(note)
        const isSelected = selectedNote === note

        return (
          <button
            key={note}
            onClick={() => onSelectNote(note)}
            className={cn(
              "rounded-full px-3 py-2 text-sm font-semibold transition-all active:scale-95",
              isSelected ? "neumorphic-pressed" : "neumorphic hover:neumorphic-pressed",
            )}
            style={{
              backgroundColor: isSelected ? noteColor : undefined,
              color: isSelected ? "#ffffff" : noteColor,
              borderColor: noteColor,
              borderWidth: isSelected ? 0 : 2,
              boxShadow: isSelected ? `0 0 12px ${noteColor}60` : undefined,
            }}
          >
            {note}
          </button>
        )
      })}
    </div>
  )
}

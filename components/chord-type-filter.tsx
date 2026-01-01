"use client"

import { CHORD_TYPES } from "@/lib/chord-data"
import { cn } from "@/lib/utils"

interface ChordTypeFilterProps {
  selectedType: string | null
  onSelectType: (type: string | null) => void
}

export function ChordTypeFilter({ selectedType, onSelectType }: ChordTypeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onSelectType(null)}
        className={cn(
          "neumorphic rounded-full px-4 py-2 text-sm font-medium transition-all active:scale-95",
          selectedType === null ? "neumorphic-pressed text-primary" : "hover:neumorphic-pressed",
        )}
      >
        All Types
      </button>
      {CHORD_TYPES.map((type) => (
        <button
          key={type.suffix}
          onClick={() => onSelectType(type.suffix)}
          className={cn(
            "neumorphic rounded-full px-3 py-2 text-sm font-medium transition-all active:scale-95",
            selectedType === type.suffix ? "neumorphic-pressed text-primary" : "hover:neumorphic-pressed",
          )}
        >
          {type.display}
        </button>
      ))}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"
import { NoteFilterDropdown } from "@/components/note-filter-dropdown"
import { ChordTypeFilterDropdown } from "@/components/chord-type-filter-dropdown"

interface MobileFilterMenuProps {
  selectedNote: string | null
  selectedType: string | null
  onSelectNote: (note: string | null) => void
  onSelectType: (type: string | null) => void
}

export function MobileFilterMenu({ selectedNote, selectedType, onSelectNote, onSelectType }: MobileFilterMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const hasActiveFilters = selectedNote || selectedType

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative w-12 h-12 rounded-full bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Open filters"
      >
        <Filter className="w-5 h-5" />
        {hasActiveFilters && <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />}
      </button>

      {/* Filter menu overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setIsOpen(false)} />

          {/* Menu panel */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl shadow-2xl p-6 space-y-6 md:hidden animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filter Chords</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="neumorphic rounded-full p-2"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter options */}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Note</label>
                <NoteFilterDropdown selectedNote={selectedNote} onSelectNote={onSelectNote} />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Chord Type</label>
                <ChordTypeFilterDropdown selectedType={selectedType} onSelectType={onSelectType} />
              </div>
            </div>

            {/* Apply button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full neumorphic rounded-full py-3 font-medium hover:neumorphic-pressed transition-all"
            >
              Apply Filters
            </button>
          </div>
        </>
      )}
    </>
  )
}

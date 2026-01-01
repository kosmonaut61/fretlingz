"use client"

import { useState, useMemo, useEffect } from "react"
import { chordDatabase, searchChords } from "@/lib/chord-data"
import { ChordCard } from "@/components/chord-card"
import { ThemeToggle } from "@/components/theme-toggle"
import { NoteFilter } from "@/components/note-filter"
import { ChordTypeFilter } from "@/components/chord-type-filter"
import { FretlingsSplash } from "@/components/fretlings-splash"
import { CommandPalette } from "@/components/command-palette"
import { Guitar, Plus, Minus, Search } from "lucide-react"
import { MobileFilterDropdown } from "@/components/mobile-filter-dropdown"
import { SectionSwitcher } from "@/components/section-switcher"
import { ComingSoon } from "@/components/coming-soon"
import { PackOpener } from "@/components/pack-opener"

export default function HomePage() {
  const [section, setSection] = useState("reference")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedNote, setSelectedNote] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [columns, setColumns] = useState(4)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)

  const handleResize = () => {
    const width = window.innerWidth
    if (width < 640) {
      setColumns(2)
    } else if (width < 1024) {
      setColumns(3)
    } else if (width < 1280) {
      setColumns(4)
    } else {
      setColumns(5)
    }
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsCommandPaletteOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const filteredChords = useMemo(() => {
    let chords = chordDatabase

    // Apply search filter
    if (searchQuery) {
      chords = searchChords(searchQuery)
    }

    // Apply note filter
    if (selectedNote) {
      chords = chords.filter((chord) => chord.key === selectedNote)
    }

    // Apply type filter
    if (selectedType) {
      chords = chords.filter((chord) => chord.suffix === selectedType)
    }

    return chords
  }, [searchQuery, selectedNote, selectedType])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedNote(null)
    setSelectedType(null)
  }

  const hasActiveFilters = searchQuery || selectedNote || selectedType

  const increaseColumns = () => {
    setColumns((prev) => Math.min(prev + 1, 8))
  }

  const decreaseColumns = () => {
    setColumns((prev) => Math.max(prev - 1, 1))
  }

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    gap: "1rem",
    paddingBottom: "8rem",
  }

  return (
    <main className="min-h-screen bg-background">
      <FretlingsSplash />
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        value={searchQuery}
        onChange={setSearchQuery}
        onSubmit={() => setIsCommandPaletteOpen(false)}
      />

      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="neumorphic rounded-xl p-2">
              <Guitar className="w-6 h-6 animate-rainbow-cycle text-primary" />
            </div>

            <SectionSwitcher value={section} onChange={setSection} />

            <ThemeToggle />
          </div>
        </div>
      </header>

      {section === "reference" ? (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredChords.length} chord{filteredChords.length !== 1 ? "s" : ""}
            </p>

            <div className="flex items-center gap-2">
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

              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-sm text-primary hover:underline">
                  Clear all filters
                </button>
              )}
            </div>
          </div>

          {filteredChords.length > 0 ? (
            <div style={gridStyle}>
              {filteredChords.map((chord, index) => (
                <ChordCard key={`${chord.key}-${chord.suffix}-${index}`} chord={chord} />
              ))}
            </div>
          ) : (
            <div className="neumorphic-inset rounded-2xl p-12 text-center">
              <p className="text-muted-foreground">No chords found matching your filters.</p>
              <button
                onClick={clearFilters}
                className="mt-4 neumorphic rounded-full px-6 py-2 text-sm font-medium hover:neumorphic-pressed transition-all"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      ) : section === "collection" ? (
        <div className="max-w-4xl mx-auto px-4 py-4">
          <PackOpener />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <ComingSoon />
        </div>
      )}

      {section === "reference" && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
          <div className="flex items-center gap-2 bg-background/80 backdrop-blur-xl border border-border rounded-full px-3 py-2 shadow-lg">
            <MobileFilterDropdown label="Note">
              <NoteFilter selectedNote={selectedNote} onSelectNote={setSelectedNote} />
            </MobileFilterDropdown>

            <MobileFilterDropdown label="Type">
              <ChordTypeFilter selectedType={selectedType} onSelectType={setSelectedType} />
            </MobileFilterDropdown>

            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="neumorphic rounded-full p-2 hover:neumorphic-pressed transition-all relative"
              aria-label="Search chords"
            >
              <Search className="w-4 h-4" />
              {searchQuery && <div className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full animate-pulse" />}
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

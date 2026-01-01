"use client"

import { useState, useRef, useEffect } from "react"
import { CHORD_TYPES } from "@/lib/chord-data"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface ChordTypeFilterDropdownProps {
  selectedType: string | null
  onSelectType: (type: string | null) => void
}

export function ChordTypeFilterDropdown({ selectedType, onSelectType }: ChordTypeFilterDropdownProps) {
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

  const handleSelect = (type: string | null) => {
    onSelectType(type)
    setIsOpen(false)
  }

  const selectedTypeDisplay = selectedType ? CHORD_TYPES.find((t) => t.suffix === selectedType)?.display : "All Types"

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="neumorphic rounded-full px-4 py-2 text-sm font-medium transition-all active:scale-95 flex items-center gap-2 min-w-[120px] justify-between"
      >
        <span>{selectedTypeDisplay}</span>
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 neumorphic rounded-2xl p-2 bg-background border border-border shadow-lg z-20 min-w-[200px]">
          <div className="max-h-[300px] overflow-y-auto space-y-1">
            <button
              onClick={() => handleSelect(null)}
              className={cn(
                "w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition-all",
                selectedType === null ? "bg-primary/10 text-primary" : "hover:bg-muted",
              )}
            >
              All Types
            </button>
            {CHORD_TYPES.map((type) => (
              <button
                key={type.suffix}
                onClick={() => handleSelect(type.suffix)}
                className={cn(
                  "w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  selectedType === type.suffix ? "bg-primary/10 text-primary" : "hover:bg-muted",
                )}
              >
                {type.display}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface SectionSwitcherProps {
  value: string
  onChange: (value: string) => void
}

const sections = [
  { value: "reference", label: "Reference" },
  { value: "explore", label: "Explore" },
  { value: "collection", label: "Collection" }, // added collection section
]

export function SectionSwitcher({ value, onChange }: SectionSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const currentSection = sections.find((s) => s.value === value) || sections[0]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="neumorphic rounded-full px-4 py-2 flex items-center gap-2 hover:neumorphic-pressed transition-all"
      >
        <span className="text-sm font-medium">{currentSection.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-40 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50">
          {sections.map((section) => (
            <button
              key={section.value}
              onClick={() => {
                onChange(section.value)
                setIsOpen(false)
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors ${
                section.value === value ? "bg-accent font-medium" : ""
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

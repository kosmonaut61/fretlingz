"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface MobileFilterDropdownProps {
  label: string
  children: React.ReactNode
}

export function MobileFilterDropdown({ label, children }: MobileFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="neumorphic rounded-xl px-3 py-2 flex items-center gap-1.5 text-sm font-medium hover:neumorphic-pressed transition-all"
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-lg p-3 w-[280px] max-w-[90vw] max-h-[60vh] overflow-y-auto">
            {children}
          </div>
        </>
      )}
    </div>
  )
}

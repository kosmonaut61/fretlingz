"use client"

import { Search, X } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="neumorphic-inset rounded-full flex items-center px-4 py-3">
        <Search className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search"
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground min-w-0"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="ml-2 p-1 rounded-full hover:bg-muted transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  )
}

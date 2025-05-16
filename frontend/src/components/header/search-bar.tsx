"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export function SearchBar() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="relative hidden md:block">
      <input
        type="search"
        placeholder="Search"
        className={`peer h-10 rounded-full border bg-background px-4 py-2 outline-none transition-all ${
          expanded ? "w-64" : "w-0 border-transparent focus:w-64 focus:border-input"
        }`}
        onFocus={() => setExpanded(true)}
        onBlur={() => setExpanded(false)}
      />
      <button
        className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
        onClick={() => setExpanded(!expanded)}
      >
        <Search className="h-5 w-5" />
      </button>
    </div>
  )
}

export function MobileSearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:text-foreground md:hidden"
      aria-label="Search"
    >
      <Search className="h-5 w-5" />
    </button>
  )
}

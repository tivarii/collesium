"use client"

import { Logo } from "./logo"
import { Navigation } from "./navigation"
import { SearchBar } from "./search-bar"

interface HeaderProps {
  logoSrc: string
  logoAlt: string
}

export function Header({ logoSrc, logoAlt }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Logo src={logoSrc} alt={logoAlt} />
          <Navigation />
        </div>
        <SearchBar />
      </div>
    </header>
  )
}

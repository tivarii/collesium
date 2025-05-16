"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileMenuButtonProps {
  onClick: () => void
}

export function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
  return (
    <Button variant="outline" size="icon" className="lg:hidden" onClick={onClick} aria-label="Toggle navigation menu">
      <Menu className="h-6 w-6" />
    </Button>
  )
}

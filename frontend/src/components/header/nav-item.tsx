"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SubMenuItem {
  title: string
  href: string
}

interface SubMenu {
  title: string
  items: SubMenuItem[]
}

interface NavItemProps {
  title: string
  href: string
  subMenus?: SubMenu[]
  isActive?: boolean
  isMobile?: boolean
}

export function NavItem({ title, href, subMenus, isActive = false, isMobile = false }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!subMenus || subMenus.length === 0) {
    return (
      <li className={cn("nav-item", isActive && "active", isMobile ? "w-full" : "")}>
        <Link
          href={href}
          className={cn(
            "nav-link flex items-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
            isActive && "text-primary",
            isMobile ? "w-full" : "",
          )}
        >
          {title}
        </Link>
      </li>
    )
  }

  return (
    <li
      className={cn("nav-item relative", isActive && "active", isMobile ? "w-full" : "")}
      onMouseEnter={() => !isMobile && setIsOpen(true)}
      onMouseLeave={() => !isMobile && setIsOpen(false)}
    >
      <button
        className={cn(
          "nav-link flex items-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
          isActive && "text-primary",
          isMobile ? "w-full justify-between" : "",
        )}
        onClick={() => isMobile && setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {title}
        <ChevronDown className={cn("ml-1 h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <ul
          className={cn(
            "dropdown-menu z-50 min-w-[200px] overflow-hidden rounded-md border bg-background p-1 shadow-md",
            isMobile ? "mt-0 w-full" : "absolute left-0 mt-2",
          )}
        >
          {subMenus.map((subMenu) => (
            <li key={subMenu.title} className="relative">
              <NestedSubMenu subMenu={subMenu} isMobile={isMobile} />
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

interface NestedSubMenuProps {
  subMenu: SubMenu
  isMobile?: boolean
}

function NestedSubMenu({ subMenu, isMobile = false }: NestedSubMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div onMouseEnter={() => !isMobile && setIsOpen(true)} onMouseLeave={() => !isMobile && setIsOpen(false)}>
      <button
        className="flex w-full items-center justify-between rounded-sm px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
        onClick={() => isMobile && setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {subMenu.title}
        <ChevronDown className={cn("ml-1 h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <ul
          className={cn(
            "dropdown-menu z-50 min-w-[200px] overflow-hidden rounded-md border bg-background p-1 shadow-md",
            isMobile ? "ml-4 mt-0 w-[calc(100%-1rem)]" : "absolute left-full top-0",
          )}
        >
          {subMenu.items.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className="block rounded-sm px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

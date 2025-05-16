"use client"

import { useState } from "react"
import { NavItem } from "./nav-item"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MobileMenuButton } from "./mobile-menu-button"
import { MobileSearchButton } from "./search-bar"

// Sample navigation data
const navigationData = [
  { title: "Home", href: "/home", isActive: true },
  { title: "About Us", href: "/about" },
  {
    title: "Products",
    href: "#",
    subMenus: [
      {
        title: "FURNITURE",
        items: [
          { title: "CHAIRS", href: "#" },
          { title: "DINING TABLE", href: "#" },
          { title: "SOFA", href: "#" },
          { title: "BEDS", href: "#" },
          { title: "SIDE TABLE", href: "#" },
          { title: "CENTRE TABLE", href: "#" },
          { title: "RECLINERS", href: "#" },
          { title: "DINING CHAIRS", href: "#" },
          { title: "CONSOLES", href: "#" },
          { title: "POUFFES", href: "#" },
          { title: "CABINATES", href: "#" },
        ],
      },
      {
        title: "ART & ARTEFACTS",
        items: [
          { title: "ARTEFACTS", href: "#" },
          { title: "WALL ART", href: "#" },
        ],
      },
      {
        title: "FURNISHING",
        items: [
          { title: "RUGS", href: "#" },
          { title: "CURTAINS", href: "#" },
          { title: "BLINDS", href: "#" },
          { title: "BEDDINGS", href: "#" },
          { title: "THROWS", href: "#" },
          { title: "CUSHIONS", href: "#" },
        ],
      },
      {
        title: "DOORS & WINDOWS",
        items: [
          { title: "DOORS", href: "#" },
          { title: "WINDOWS", href: "#" },
        ],
      },
      {
        title: "LIGHTING",
        items: [
          { title: "CHANDELIERS", href: "#" },
          { title: "PENDANT LIGHTS", href: "#" },
          { title: "FLOOR LAMPS", href: "#" },
          { title: "TABLE LAMPS", href: "#" },
        ],
      },
      {
        title: "LIFESTYLE PRODUCTS",
        items: [
          { title: "TABLEWARE", href: "#" },
          { title: "BATH ACCESSORIES", href: "#" },
        ],
      },
    ],
  },
  { title: "Contact Us", href: "/contacts" },
  { title: "Careers", href: "/career" },
  { title: "News", href: "/news" },
]

export function Navigation() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block">
        <ul className="flex items-center space-x-1">
          {navigationData.map((item) => (
            <NavItem
              key={item.title}
              title={item.title}
              href={item.href}
              subMenus={item.subMenus}
              isActive={item.isActive}
            />
          ))}
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <div className="flex items-center lg:hidden">
        <MobileSearchButton onClick={() => setMobileSearchOpen(!mobileSearchOpen)} />

        <Sheet>
          <SheetTrigger asChild>
            <MobileMenuButton onClick={() => {}} />
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px]">
            <div className="mt-6 flex flex-col space-y-2">
              {navigationData.map((item) => (
                <NavItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  subMenus={item.subMenus}
                  isActive={item.isActive}
                  isMobile={true}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Mobile Search Overlay */}
      {mobileSearchOpen && (
        <div className="absolute left-0 top-0 z-50 flex h-20 w-full items-center justify-between bg-background px-4">
          <input
            type="search"
            placeholder="Search"
            className="h-10 w-full rounded-full border bg-background px-4 py-2 outline-none"
            autoFocus
          />
          <button
            className="ml-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileSearchOpen(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  )
}

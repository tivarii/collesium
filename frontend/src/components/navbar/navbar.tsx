"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Menu, X, ChevronDown } from "lucide-react"
import { CategoryMenu } from "./category-menu"
import type { Category, SubCategoryInterface, ProductInterface } from "@/types"

interface NavbarProps {
  logo: string
  categories: Category[]
  subcategories: SubCategoryInterface[]
  products: ProductInterface[]
}

export function Navbar({ logo, categories, subcategories, products }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  logo = "https://the-colosseum.blr1.cdn.digitaloceanspaces.com/The-Colosseum/Brands/The-Colosseum-Jubilee-Hills-Hyderabad.svg";
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-4 z-50 mx-auto w-[95%] max-w-7xl rounded-lg bg-white shadow-md transition-all duration-300 ${
        scrolled ? "top-2" : "top-4"
      }`}
    >
      <div className="relative flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <img src={logo || "/placeholder.svg"} alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 transform lg:block">
          <ul className="flex items-center space-x-8">
            <NavItem href="/" label="Home" />
            <NavItem href="/about" label="About Us" />
            <ProductsDropdown categories={categories} subcategories={subcategories} products={products} />
            <NavItem href="/contact" label="Contact Us" />
            <NavItem href="/careers" label="Careers" />
            <NavItem href="/news" label="News" />
          </ul>
        </nav>

        {/* Right side icons */}
        <div className="flex items-center">
          <button className="ml-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <Search className="h-5 w-5" />
          </button>

          {/* Mobile menu button */}
          <button
            className="ml-2 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-2 lg:hidden">
          <ul className="space-y-1">
            <MobileNavItem href="/" label="Home" onClick={() => setIsOpen(false)} />
            <MobileNavItem href="/about" label="About Us" onClick={() => setIsOpen(false)} />
            <MobileCategoryMenu
              categories={categories}
              subcategories={subcategories}
              products={products}
              onClose={() => setIsOpen(false)}
            />
            <MobileNavItem href="/contact" label="Contact Us" onClick={() => setIsOpen(false)} />
            <MobileNavItem href="/careers" label="Careers" onClick={() => setIsOpen(false)} />
            <MobileNavItem href="/news" label="News" onClick={() => setIsOpen(false)} />
          </ul>
        </div>
      )}
    </header>
  )
}

function NavItem({ href, label, isActive = false }: { href: string; label: string; isActive?: boolean }) {
  return (
    <li>
      <Link
        href={href}
        className={`inline-flex items-center px-1 py-2 text-sm font-medium ${
          isActive ? "text-gray-900" : "text-gray-500 transition-colors hover:text-gray-900"
        }`}
      >
        {label}
      </Link>
    </li>
  )
}

function ProductsDropdown({
  categories,
  subcategories,
  products,
}: {
  categories: Category[]
  subcategories: SubCategoryInterface[]
  products: ProductInterface[]
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className="relative">
      <button
        className="inline-flex items-center px-1 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
        // onMouseEnter={() => setIsOpen(true)}
        // onMouseLeave={() => setIsOpen(false)}
      >
        Products
        <ChevronDown className="ml-1 h-4 w-4 transition-transform" />
      </button>

      {isOpen && (
        <div
          className="absolute left-1/2 mt-1 w-[280px] -translate-x-1/2 transform rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <CategoryMenu categories={categories} subcategories={subcategories} products={products} />
        </div>
      )}
    </li>
  )
}

function MobileNavItem({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <li>
      <Link
        href={href}
        className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        onClick={onClick}
      >
        {label}
      </Link>
    </li>
  )
}

function MobileCategoryMenu({
  categories,
  subcategories,
  products,
  onClose,
}: {
  categories: Category[]
  subcategories: SubCategoryInterface[]
  products: ProductInterface[]
  onClose: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [view, setView] = useState<"categories" | "subcategories" | "products">("categories")

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setView("subcategories")
  }

  const handleSubcategoryClick = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId)
    setView("products")
  }

  const handleBackClick = () => {
    if (view === "products") {
      setView("subcategories")
    } else if (view === "subcategories") {
      setView("categories")
    }
  }

  const filteredSubcategories = subcategories.filter((sub) => sub.category === selectedCategory)
  const filteredProducts = products.filter((product) => product.subcategoryId === selectedSubcategory)

  return (
    <li>
      <button
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        Products
        <span className="text-xs">{isOpen ? "▼" : "▶"}</span>
      </button>

      {isOpen && (
        <div className="mt-1 space-y-1 pl-4">
          {view === "categories" && (
            <>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => handleCategoryClick(category.id || "")}
                >
                  {category.name}
                  <span className="text-xs">▶</span>
                </button>
              ))}
            </>
          )}

          {view === "subcategories" && (
            <>
              <button
                className="mb-2 flex items-center rounded-md px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-700"
                onClick={handleBackClick}
              >
                ← Back to Categories
              </button>
              {filteredSubcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => handleSubcategoryClick(subcategory.id || "")}
                >
                  {subcategory.name}
                  <span className="text-xs">▶</span>
                </button>
              ))}
            </>
          )}

          {view === "products" && (
            <>
              <button
                className="mb-2 flex items-center rounded-md px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-700"
                onClick={handleBackClick}
              >
                ← Back to Subcategories
              </button>
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  onClick={onClose}
                >
                  {product.name}
                </Link>
              ))}
            </>
          )}
        </div>
      )}
    </li>
  )
}

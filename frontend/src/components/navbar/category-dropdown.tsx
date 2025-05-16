"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import type { Category, SubCategoryInterface, ProductInterface } from "@/types"

interface CategoryDropdownProps {
  categories: Category[]
  subcategories: SubCategoryInterface[]
  products: ProductInterface[]
}

export function CategoryDropdown({ categories, subcategories, products }: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLLIElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setActiveCategory(null)
      setActiveSubcategory(null)
    }
  }

  const handleCategoryHover = (categoryId: string) => {
    setActiveCategory(categoryId)
    setActiveSubcategory(null)
  }

  const handleSubcategoryHover = (subcategoryId: string) => {
    setActiveSubcategory(subcategoryId)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <li className="relative" ref={dropdownRef}>
      <button
        className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        onClick={toggleDropdown}
      >
        Products
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-10 mt-2 w-screen max-w-screen-xl rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="grid grid-cols-5 gap-4">
            {/* Categories Column */}
            <div className="col-span-1 border-r">
              <ul className="space-y-2 py-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      className={`flex w-full items-center justify-between rounded-md px-4 py-2 text-sm ${
                        activeCategory === category.id
                          ? "bg-gray-100 font-medium text-gray-900"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onMouseEnter={() => handleCategoryHover(category.id || "")}
                    >
                      <span>{category.name}</span>
                      <ChevronDown className="h-4 w-4 -rotate-90" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subcategories Column */}
            {activeCategory && (
              <div className="col-span-1 border-r">
                <ul className="space-y-2 py-2">
                  {subcategories
                    .filter((sub) => sub.category === activeCategory)
                    .map((subcategory) => (
                      <li key={subcategory.id}>
                        <button
                          className={`flex w-full items-center justify-between rounded-md px-4 py-2 text-sm ${
                            activeSubcategory === subcategory.id
                              ? "bg-gray-100 font-medium text-gray-900"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          onMouseEnter={() => handleSubcategoryHover(subcategory.id || "")}
                        >
                          <span>{subcategory.name}</span>
                          <ChevronDown className="h-4 w-4 -rotate-90" />
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {/* Products Column */}
            {activeSubcategory && (
              <div className="col-span-3">
                <div className="grid grid-cols-3 gap-4 p-4">
                  {products
                    .filter((product) => product.subcategoryId === activeSubcategory)
                    .map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="group rounded-lg p-2 hover:bg-gray-50"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="aspect-h-1 aspect-w-1 mb-2 overflow-hidden rounded-md bg-gray-100">
                          {product.image ? (
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="h-full w-full object-cover object-center group-hover:opacity-75"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center bg-gray-200">
                              <span className="text-sm text-gray-500">No image</span>
                            </div>
                          )}
                        </div>
                        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">${product.price.toFixed(2)}</p>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </li>
  )
}

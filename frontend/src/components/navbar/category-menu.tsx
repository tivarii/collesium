"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { Category, SubCategoryInterface, ProductInterface } from "@/types"

interface CategoryMenuProps {
  categories: Category[]
  subcategories: SubCategoryInterface[]
  products: ProductInterface[]
}

export function CategoryMenu({ categories, subcategories, products }: CategoryMenuProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(null)

  const handleCategoryHover = (categoryId: string | null) => {
    setHoveredCategory(categoryId)
    // Reset subcategory selection when changing categories
    if (!categoryId) {
      setHoveredSubcategory(null)
    }
  }

  const handleSubcategoryHover = (subcategoryId: string | null) => {
    setHoveredSubcategory(subcategoryId)
  }

  const filteredSubcategories = subcategories.filter((sub) => sub.category === hoveredCategory)
  const filteredProducts = products.filter((product) => product.subcategoryId === hoveredSubcategory)

  return (
    <div className="relative py-1">
      {/* Category list - main menu */}
      <div className="categories-column">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative"
            onMouseEnter={() => handleCategoryHover(category.id || "")}
          >
            <button className="flex w-full items-center justify-between rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              {category.name}
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Subcategory menu appears directly next to the hovered category */}
            {hoveredCategory === category.id && (
              <div
                className="absolute left-full top-0 z-10 min-w-[200px] rounded-md border border-gray-200 bg-white shadow-lg"
                onMouseEnter={() => handleCategoryHover(category.id || "")}
                onMouseLeave={() =>
                  setTimeout(() => {
                    if (hoveredCategory === category.id) {
                      handleCategoryHover(null)
                    }
                  }, 100)
                }
                style={{ marginLeft: "2px", top: "0" }}
              >
                <div className="py-1">
                  {/* <div className="mb-1 px-4 py-1 text-xs font-medium text-gray-500">
                    {category.name}
                  </div> */}
                  {filteredSubcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      href={`/categories/${hoveredCategory}/subcategories/${subcategory.id}`}
                      className="flex w-full items-center justify-between rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onMouseEnter={() => handleSubcategoryHover(subcategory.id || "")}
                    >
                      {subcategory.name}
                      {/* <ChevronRight className="h-4 w-4 opacity-50" /> */}
                    </Link>
                  ))}
                  {filteredSubcategories.length === 0 && (
                    <div className="px-4 py-2 text-sm text-gray-500">No subcategories</div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Products flyout menu (shows when hovering on a subcategory) */}
      {hoveredSubcategory && filteredProducts.length > 0 && (
        <div
          className="products-column absolute z-20 min-w-[200px] max-h-80 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg"
          style={{
            left: `calc(100% + 220px)`,
            top: `${
              document.querySelector(`[data-subcategory-id="${hoveredSubcategory}"]`)?.getBoundingClientRect().top || 0
            }px`,
          }}
          onMouseLeave={() => setHoveredSubcategory(null)}
        >
          {/* <div className="py-1">
            <div className="mb-1 px-4 py-1 text-xs font-medium text-gray-500">
              {subcategories.find((s) => s.id === hoveredSubcategory)?.name}
            </div>
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {product.name}
              </Link>
            ))}
          </div> */}
        </div>
      )}
    </div>
  )
}

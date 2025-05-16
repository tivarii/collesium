import { Navbar } from "@/components/navbar/navbar"
import type { Category, SubCategoryInterface, ProductInterface } from "@/types"

// Sample data
const categories: Category[] = [
  { id: "1", name: "Furniture" },
  { id: "2", name: "Art & Artefacts" },
  { id: "3", name: "Furnishing" },
  { id: "4", name: "Doors & Windows" },
  { id: "5", name: "Lighting" },
  { id: "6", name: "Kitchens" },
  { id: "7", name: "Wardrobes" },
  { id: "8", name: "Lifestyle Products" },
]

const subcategories: SubCategoryInterface[] = [
  { id: "1", name: "Chairs", category: "1" },
  { id: "2", name: "Dining Table", category: "1" },
  { id: "3", name: "Sofa", category: "1" },
  { id: "4", name: "Beds", category: "1" },
  { id: "5", name: "Side Table", category: "1" },
  { id: "6", name: "Centre Table", category: "1" },
  { id: "7", name: "Artefacts", category: "2" },
  { id: "8", name: "Wall Art", category: "2" },
  { id: "9", name: "Rugs", category: "3" },
  { id: "10", name: "Curtains", category: "3" },
  { id: "11", name: "Blinds", category: "3" },
  { id: "12", name: "Doors", category: "4" },
  { id: "13", name: "Windows", category: "4" },
  { id: "14", name: "Chandeliers", category: "5" },
  { id: "15", name: "Pendant Lights", category: "5" },
  { id: "16", name: "Floor Lamps", category: "5" },
  { id: "17", name: "Table Lamps", category: "5" },
  { id: "18", name: "Tableware", category: "8" },
  { id: "19", name: "Bath Accessories", category: "8" },
]

const products: ProductInterface[] = [
  {
    id: "1",
    name: "Ergonomic Office Chair",
    description: "Comfortable office chair with lumbar support",
    price: 299.99,
    categoryId: "1",
    subcategoryId: "1",
    image: null,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Dining Chair Set",
    description: "Set of 4 elegant dining chairs",
    price: 599.99,
    categoryId: "1",
    subcategoryId: "1",
    image: null,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Leather Sofa",
    description: "Premium leather 3-seater sofa",
    price: 1299.99,
    categoryId: "1",
    subcategoryId: "3",
    image: null,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Abstract Canvas Art",
    description: "Modern abstract painting on canvas",
    price: 349.99,
    categoryId: "2",
    subcategoryId: "8",
    image: null,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "Crystal Chandelier",
    description: "Elegant crystal chandelier for dining rooms",
    price: 1499.99,
    categoryId: "5",
    subcategoryId: "14",
    image: null,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    name: "Modern Pendant Light",
    description: "Contemporary pendant light for kitchen islands",
    price: 249.99,
    categoryId: "5",
    subcategoryId: "15",
    image: null,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar
        logo="/placeholder.svg?height=40&width=120"
        categories={categories}
        subcategories={subcategories}
        products={products}
      />

      {/* Content with padding to account for fixed header */}
      <div className="pt-28">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Welcome to The Colosseum</h1>
          <p className="mt-4">Luxury furniture for your home</p>

          {/* Sample content */}
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-lg bg-white p-6 shadow-md">
                <div className="aspect-square w-full rounded-md bg-gray-200"></div>
                <h2 className="mt-4 text-xl font-semibold">Product Category {i + 1}</h2>
                <p className="mt-2 text-gray-600">Explore our collection of luxury furniture</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

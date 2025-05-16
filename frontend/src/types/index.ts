export interface Category {
  id?: string
  name: string
  description?: string
  created_at?: string
  updated_at?: string
  // Add other properties as needed
}

export interface SubCategoryInterface {
  id?: string
  name: string
  description?: string
  created_at?: string
  updated_at?: string
  category: string
}

export interface ProductInterface {
  id: string
  name: string
  description: string
  price: number
  categoryId: string
  subcategoryId: string
  image: string | null
  inStock: boolean
  createdAt: Date
  updatedAt: Date
}

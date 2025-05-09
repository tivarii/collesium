// Dummy data for the admin dashboard

export type Category = {
    id: string
    name: string
    description: string
    createdAt: Date
    updatedAt: Date
}

export type Subcategory = {
    id: string
    name: string
    description: string
    categoryId: string
    createdAt: Date
    updatedAt: Date
}

export type Product = {
    id: string
    name: string
    description: string
    price: number
    categoryId: string
    subcategoryId: string
    image: string
    inStock: boolean
    createdAt: Date
    updatedAt: Date
}

// Initial categories
export const categories: Category[] = [
    {
        id: "1",
        name: "Chandeliers",
        description: "Luxury chandeliers for elegant spaces",
        createdAt: new Date("2023-01-15"),
        updatedAt: new Date("2023-01-15"),
    },
    {
        id: "2",
        name: "Wall Lights",
        description: "Decorative wall lighting solutions",
        createdAt: new Date("2023-01-20"),
        updatedAt: new Date("2023-01-20"),
    },
    {
        id: "3",
        name: "Pendant Lights",
        description: "Hanging pendant lights for various spaces",
        createdAt: new Date("2023-02-05"),
        updatedAt: new Date("2023-02-05"),
    },
    {
        id: "4",
        name: "Table Lamps",
        description: "Elegant table lamps for any setting",
        createdAt: new Date("2023-02-10"),
        updatedAt: new Date("2023-02-10"),
    },
    {
        id: "5",
        name: "Floor Lamps",
        description: "Stylish floor lamps for ambient lighting",
        createdAt: new Date("2023-03-01"),
        updatedAt: new Date("2023-03-01"),
    },
]

// Initial subcategories
export const subcategories: Subcategory[] = [
    {
        id: "1",
        name: "Crystal Chandeliers",
        description: "Luxury crystal chandeliers",
        categoryId: "1",
        createdAt: new Date("2023-01-16"),
        updatedAt: new Date("2023-01-16"),
    },
    {
        id: "2",
        name: "Modern Chandeliers",
        description: "Contemporary chandelier designs",
        categoryId: "1",
        createdAt: new Date("2023-01-17"),
        updatedAt: new Date("2023-01-17"),
    },
    {
        id: "3",
        name: "Sconces",
        description: "Decorative wall sconces",
        categoryId: "2",
        createdAt: new Date("2023-01-21"),
        updatedAt: new Date("2023-01-21"),
    },
    {
        id: "4",
        name: "Picture Lights",
        description: "Lights designed for artwork display",
        categoryId: "2",
        createdAt: new Date("2023-01-22"),
        updatedAt: new Date("2023-01-22"),
    },
    {
        id: "5",
        name: "Glass Pendants",
        description: "Hanging lights with glass elements",
        categoryId: "3",
        createdAt: new Date("2023-02-06"),
        updatedAt: new Date("2023-02-06"),
    },
    {
        id: "6",
        name: "Metal Pendants",
        description: "Pendant lights with metal finishes",
        categoryId: "3",
        createdAt: new Date("2023-02-07"),
        updatedAt: new Date("2023-02-07"),
    },
    {
        id: "7",
        name: "Decorative Table Lamps",
        description: "Ornate table lamps for luxury spaces",
        categoryId: "4",
        createdAt: new Date("2023-02-11"),
        updatedAt: new Date("2023-02-11"),
    },
    {
        id: "8",
        name: "Reading Lamps",
        description: "Functional lamps for reading areas",
        categoryId: "4",
        createdAt: new Date("2023-02-12"),
        updatedAt: new Date("2023-02-12"),
    },
    {
        id: "9",
        name: "Arc Floor Lamps",
        description: "Curved floor lamps for dramatic lighting",
        categoryId: "5",
        createdAt: new Date("2023-03-02"),
        updatedAt: new Date("2023-03-02"),
    },
    {
        id: "10",
        name: "Tripod Floor Lamps",
        description: "Three-legged floor lamps with stable base",
        categoryId: "5",
        createdAt: new Date("2023-03-03"),
        updatedAt: new Date("2023-03-03"),
    },
]

// Initial products
export const products: Product[] = [
    {
        id: "1",
        name: "Royal Crystal Chandelier",
        description: "Luxurious crystal chandelier with 24 lights",
        price: 12500,
        categoryId: "1",
        subcategoryId: "1",
        image: "/placeholder.svg?height=200&width=200",
        inStock: true,
        createdAt: new Date("2023-01-18"),
        updatedAt: new Date("2023-01-18"),
    },
    {
        id: "2",
        name: "Empire Crystal Chandelier",
        description: "Classic empire style crystal chandelier",
        price: 9800,
        categoryId: "1",
        subcategoryId: "1",
        image: "/placeholder.svg?height=200&width=200",
        inStock: true,
        createdAt: new Date("2023-01-19"),
        updatedAt: new Date("2023-01-19"),
    },
    {
        id: "3",
        name: "Geometric Modern Chandelier",
        description: "Contemporary geometric design with LED lights",
        price: 7500,
        categoryId: "1",
        subcategoryId: "2",
        image: "/placeholder.svg?height=200&width=200",
        inStock: true,
        createdAt: new Date("2023-01-20"),
        updatedAt: new Date("2023-01-20"),
    },
    {
        id: "4",
        name: "Minimalist Chandelier",
        description: "Clean lines with brushed gold finish",
        price: 6200,
        categoryId: "1",
        subcategoryId: "2",
        image: "/placeholder.svg?height=200&width=200",
        inStock: false,
        createdAt: new Date("2023-01-21"),
        updatedAt: new Date("2023-01-21"),
    },
    {
        id: "5",
        name: "Crystal Wall Sconce",
        description: "Elegant crystal wall sconce with gold accents",
        price: 2800,
        categoryId: "2",
        subcategoryId: "3",
        image: "/placeholder.svg?height=200&width=200",
        inStock: true,
        createdAt: new Date("2023-01-23"),
        updatedAt: new Date("2023-01-23"),
    },
    {
        id: "6",
        name: "Art Deco Sconce",
        description: "Vintage inspired art deco wall sconce",
        price: 1950,
        categoryId: "2",
        subcategoryId: "3",
        image: "/placeholder.svg?height=200&width=200",
        inStock: true,
        createdAt: new Date("2023-01-24"),
        updatedAt: new Date("2023-01-24"),
    },
    {
        id: "7",
        name: "LED Picture Light",
        description: "Adjustable LED light for artwork display",
        price: 850,
        categoryId: "2",
        subcategoryId: "4",
        image: "/placeholder.svg?height=200&width=200",
        inStock: true,
        createdAt: new Date("2023-01-25"),
        updatedAt: new Date("2023-01-25"),
    },
    {
        id: "8",
        name: "Brass Picture Light",
        description: "Classic brass picture light with warm glow",
        price: 1200,
        categoryId: "2",
        subcategoryId: "4",
        image: "/placeholder.svg?height=200&width=200",
        inStock: true,
        createdAt: new Date("2023-01-26"),
        updatedAt: new Date("2023-01-26"),
    },
    {
        id: "9",
        name: "Murano Glass Pendant",
        description: "Handcrafted Murano glass pendant light",
        price: 3600,
        categoryId: "3",
        subcategoryId: "5",
        image: "/placeholder.svg?height=200&width=200",
        inStock: true,
        createdAt: new Date("2023-02-08"),
        updatedAt: new Date("2023-02-08"),
    },
    {
        id: "10",
        name: "Cluster Glass Pendant",
        description: "Multiple glass globes in cluster arrangement",
        price: 4200,
        categoryId: "3",
        subcategoryId: "5",
        image: "/placeholder.svg?height=200&width=200",
        inStock: false,
        createdAt: new Date("2023-02-09"),
        updatedAt: new Date("2023-02-09"),
    },
    {
        id: "11",
        name: "Industrial Metal Pendant",
        description: "Raw metal finish with vintage bulb",
        price: 1800,
        categoryId: "3",
        subcategoryId: "6",
        image: "/placeholder.svg?height=200&width=200",
        inStock: true,
        createdAt: new Date("2023-02-10"),
        updatedAt: new Date("2023-02-10"),
    },
    {
        id: "12",
        name: "Copper Dome Pendant",
        description: "Polished copper dome pendant light",
        price: 2400,
        categoryId: "3",
        subcategoryId: "6",
        image: "/placeholder.svg?height=200&width=200",
        inStock: true,
        createdAt: new Date("2023-02-11"),
        updatedAt: new Date("2023-02-11"),
    },
]

// Recent activity data
export type Activity = {
    id: string
    action: string
    target: string
    user: string
    timestamp: Date
}

export const recentActivity: Activity[] = [
    {
        id: "1",
        action: "added",
        target: "Royal Crystal Chandelier",
        user: "Admin",
        timestamp: new Date("2023-04-15T10:30:00"),
    },
    {
        id: "2",
        action: "updated",
        target: "Empire Crystal Chandelier",
        user: "Admin",
        timestamp: new Date("2023-04-14T14:45:00"),
    },
    {
        id: "3",
        action: "deleted",
        target: "Vintage Floor Lamp",
        user: "Admin",
        timestamp: new Date("2023-04-13T09:15:00"),
    },
    {
        id: "4",
        action: "added",
        target: "Modern Chandeliers",
        user: "Admin",
        timestamp: new Date("2023-04-12T16:20:00"),
    },
    {
        id: "5",
        action: "updated",
        target: "Crystal Wall Sconce",
        user: "Admin",
        timestamp: new Date("2023-04-11T11:05:00"),
    },
]

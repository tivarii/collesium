"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { generateId } from "@/lib/utils"
// import { categories } from "@/lib/data"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCategory } from "@/contexts/categoryContext"
import { useSubCategory } from "@/contexts/subCategoryContext"

export function SubcategoryForm() {
  const { categories } = useCategory()
  const { createSubcategory } = useSubCategory()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const { name, description, category } = formData
    if (!name || !description || !category) {
      alert("Please fill in all fields")
      setIsLoading(false)
      return
    }
    createSubcategory({
      name,
      description,
      category,
    })
      .then(() => {
        setFormData({ name: "", description: "", category: "" })
        router.push("/admin/subcategories")
      })
      .catch((error) => {
        console.error("Error creating subcategory:", error)
        alert("Failed to create subcategory")
      })
      .finally(() => {
        setIsLoading(false)
      }) ; 
    // Simulate API call
    setTimeout(() => {
      console.log("Subcategory created:", {
        id: generateId(),
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      setIsLoading(false)
      router.push("/admin/subcategories")
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Subcategory Information</CardTitle>
          <CardDescription>Enter the details for the new subcategory.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter subcategory name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter subcategory description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Parent Category</Label>
            <Select value="ram" onValueChange={handleSelectChange} required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category">
                  {formData.category ? categories?.find((cat) => cat.id === formData.category)?.name : "Select a category"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categories
                  ?.filter((category) => category.id !== undefined)
                  .map((category) => (
                    <SelectItem key={category.id?.toString()} value={category.id as string}>
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/subcategories")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Subcategory"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

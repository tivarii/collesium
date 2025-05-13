"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
// import { generateId } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCategory } from "@/contexts/categoryContext"

export function CategoryForm() {
  const { createCategory } = useCategory()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const response:any = await createCategory({name: formData.name, description: formData.description});
    if (response.status === 201) {
      router.push("/admin/categories")
    }

    // Simulate API call
    // setTimeout(() => {
    //   console.log("Category created:", {
    //     id: generateId(),
    //     ...formData,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   })
    //   setIsLoading(false)
    //   router.push("/admin/categories")
    // }, 1000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Category Information</CardTitle>
          <CardDescription>Enter the details for the new category.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter category name"
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
              placeholder="Enter category description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/categories")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Category"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

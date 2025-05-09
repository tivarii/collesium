"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { generateId } from "@/lib/utils"
import { categories, subcategories } from "@/lib/data"
import { Upload, X, FileSpreadsheet, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function ProductForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("single")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    subcategoryId: "",
    inStock: true,
    image: "/placeholder.svg?height=200&width=200",
  })
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [bulkUploadFile, setBulkUploadFile] = useState<File | null>(null)
  const [bulkUploadPreview, setBulkUploadPreview] = useState<Array<any>>([])
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const filteredSubcategories = subcategories.filter((subcategory) => subcategory.categoryId === formData.categoryId)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => {
      // If changing category, reset subcategory
      if (field === "categoryId") {
        return { ...prev, [field]: value, subcategoryId: "" }
      }
      return { ...prev, [field]: value }
    })
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, inStock: checked }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string)
          setFormData((prev) => ({ ...prev, image: event.target?.result as string }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setUploadedImage(null)
    setFormData((prev) => ({ ...prev, image: "/placeholder.svg?height=200&width=200" }))
    if (imageInputRef.current) {
      imageInputRef.current.value = ""
    }
  }

  const handleBulkFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setBulkUploadFile(file)
      // In a real app, you would parse the Excel file here
      // For this demo, we'll simulate parsing with dummy data
      simulateExcelParsing(file)
    }
  }

  const simulateExcelParsing = (file: File) => {
    // Simulate parsing an Excel file
    // In a real app, you would use a library like xlsx or papaparse
    console.log("Parsing file:", file.name)

    // Generate some dummy preview data
    const dummyPreview = [
      {
        name: "Crystal Pendant Light",
        description: "Elegant crystal pendant light for dining areas",
        price: "4500",
        category: "Pendant Lights",
        subcategory: "Glass Pendants",
        inStock: true,
      },
      {
        name: "Modern Wall Sconce",
        description: "Contemporary wall sconce with LED lighting",
        price: "2200",
        category: "Wall Lights",
        subcategory: "Sconces",
        inStock: true,
      },
      {
        name: "Vintage Table Lamp",
        description: "Classic design with brass finish",
        price: "3800",
        category: "Table Lamps",
        subcategory: "Decorative Table Lamps",
        inStock: false,
      },
    ]

    setBulkUploadPreview(dummyPreview)
  }

  const handleBulkUpload = () => {
    setIsLoading(true)

    // Simulate API call for bulk upload
    setTimeout(() => {
      console.log("Bulk upload processed:", bulkUploadFile?.name)
      console.log("Products to be created:", bulkUploadPreview)
      setIsLoading(false)
      setUploadSuccess(true)

      // Reset after 3 seconds
      setTimeout(() => {
        setUploadSuccess(false)
        setBulkUploadFile(null)
        setBulkUploadPreview([])
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }, 3000)
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Product created:", {
        id: generateId(),
        ...formData,
        price: Number.parseFloat(formData.price),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      setIsLoading(false)
      router.push("/admin/products")
    }, 1000)
  }

  const downloadSampleTemplate = () => {
    // In a real app, this would generate and download an Excel template
    console.log("Downloading sample template")
    alert("In a real app, this would download a sample Excel template")
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="single">Single Product</TabsTrigger>
        <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
      </TabsList>

      <TabsContent value="single">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>Enter the details for the new product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter product name"
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
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter product price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) => handleSelectChange("categoryId", value)}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subcategory">Subcategory</Label>
                <Select
                  value={formData.subcategoryId}
                  onValueChange={(value) => handleSelectChange("subcategoryId", value)}
                  disabled={!formData.categoryId}
                  required
                >
                  <SelectTrigger id="subcategory">
                    <SelectValue
                      placeholder={formData.categoryId ? "Select a subcategory" : "Select a category first"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredSubcategories.map((subcategory) => (
                      <SelectItem key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="inStock" checked={formData.inStock} onCheckedChange={handleSwitchChange} />
                <Label htmlFor="inStock">In Stock</Label>
              </div>

              <div className="space-y-2">
                <Label>Product Image</Label>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative h-40 w-40 overflow-hidden rounded-md border">
                    <Image src={uploadedImage || formData.image} alt="Product preview" fill className="object-cover" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <div className="flex flex-wrap gap-2">
                      <Button type="button" variant="outline" onClick={() => imageInputRef.current?.click()}>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </Button>
                      {uploadedImage && (
                        <Button type="button" variant="outline" onClick={handleRemoveImage}>
                          <X className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">Recommended: 800x800px. Max size: 5MB.</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Product"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </TabsContent>

      <TabsContent value="bulk">
        <Card>
          <CardHeader>
            <CardTitle>Bulk Upload Products</CardTitle>
            <CardDescription>Upload multiple products at once using an Excel spreadsheet.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-dashed p-8">
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <FileSpreadsheet className="h-12 w-12 text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-semibold">Upload Excel File</h3>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop or click to upload an Excel file (.xlsx, .xls, .csv)
                  </p>
                </div>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleBulkFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    Select File
                  </Button>
                  <Button type="button" variant="outline" onClick={downloadSampleTemplate}>
                    Download Template
                  </Button>
                </div>
              </div>
            </div>

            {bulkUploadFile && (
              <Alert>
                <FileSpreadsheet className="h-4 w-4" />
                <AlertTitle>File selected</AlertTitle>
                <AlertDescription className="flex items-center justify-between">
                  <span>{bulkUploadFile.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setBulkUploadFile(null)
                      setBulkUploadPreview([])
                      if (fileInputRef.current) {
                        fileInputRef.current.value = ""
                      }
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {uploadSuccess && (
              <Alert variant="default">
                <Check className="h-4 w-4" />
                <AlertTitle>Upload successful</AlertTitle>
                <AlertDescription>Your products have been uploaded successfully.</AlertDescription>
              </Alert>
            )}

            {bulkUploadPreview.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Preview ({bulkUploadPreview.length} products)</h3>
                <div className="max-h-60 overflow-auto rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-4 py-2 text-left font-medium">Name</th>
                        <th className="px-4 py-2 text-left font-medium">Category</th>
                        <th className="px-4 py-2 text-left font-medium">Price</th>
                        <th className="px-4 py-2 text-left font-medium">Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulkUploadPreview.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2">{item.name}</td>
                          <td className="px-4 py-2">{item.category}</td>
                          <td className="px-4 py-2">₹{item.price}</td>
                          <td className="px-4 py-2">{item.inStock ? "In Stock" : "Out of Stock"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View Full Preview</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Bulk Upload Preview</DialogTitle>
                      <DialogDescription>Review all products before uploading</DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[60vh] overflow-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="px-4 py-2 text-left font-medium">Name</th>
                            <th className="px-4 py-2 text-left font-medium">Description</th>
                            <th className="px-4 py-2 text-left font-medium">Category</th>
                            <th className="px-4 py-2 text-left font-medium">Subcategory</th>
                            <th className="px-4 py-2 text-left font-medium">Price</th>
                            <th className="px-4 py-2 text-left font-medium">Stock</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bulkUploadPreview.map((item, index) => (
                            <tr key={index} className="border-b">
                              <td className="px-4 py-2">{item.name}</td>
                              <td className="px-4 py-2 max-w-xs truncate">{item.description}</td>
                              <td className="px-4 py-2">{item.category}</td>
                              <td className="px-4 py-2">{item.subcategory}</td>
                              <td className="px-4 py-2">₹{item.price}</td>
                              <td className="px-4 py-2">{item.inStock ? "In Stock" : "Out of Stock"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => {}}>
                        Close
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
              Cancel
            </Button>
            <Button type="button" disabled={!bulkUploadFile || isLoading || uploadSuccess} onClick={handleBulkUpload}>
              {isLoading ? "Processing..." : "Upload Products"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

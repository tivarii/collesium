"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Edit, MoreHorizontal, Trash } from "lucide-react"

import { useSubCategory } from "@/contexts/subCategoryContext"
import { SubCategoryInterface } from "@/contexts/subCategoryContext"
import { useCategory } from "@/contexts/categoryContext"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function SubcategoriesTable() {
  const { subcategories } = useSubCategory()
  const { categories } = useCategory()
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [subcategoryToDelete, setSubcategoryToDelete] = useState<SubCategoryInterface | null>(null);
  const filteredSubcategories = (subcategories !== null )?(subcategories.filter(
    (subcategory) =>
      subcategory.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subcategory.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )):[]

  const getCategoryName = (categoryId: string) => {
    const category = (categories !== null)?categories.find((c) => c.id === categoryId):null
    return category ? category.name : "Unknown"
  }

  const handleDelete = (subcategory: SubCategoryInterface) => {
    setSubcategoryToDelete(subcategory)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (subcategoryToDelete) {
      // setSubcategories(subcategories.filter((s) => s.id !== subcategoryToDelete.id))
      setDeleteDialogOpen(false)
      setSubcategoryToDelete(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search subcategories..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubcategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No subcategories found.
                </TableCell>
              </TableRow>
            ) : (
              filteredSubcategories.map((subcategory) => (
                <TableRow key={subcategory.id}>
                  <TableCell className="font-medium">{subcategory.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{subcategory.description}</TableCell>
                  <TableCell>{getCategoryName(subcategory.category)}</TableCell>
                  <TableCell className="hidden md:table-cell">{(subcategory.created_at)?formatDate(new Date(subcategory.created_at)):"N/A"}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`#`} className="flex w-full cursor-pointer items-center">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                          onClick={() => handleDelete(subcategory)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the subcategory
              {subcategoryToDelete && <strong> {subcategoryToDelete.name}</strong>} and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

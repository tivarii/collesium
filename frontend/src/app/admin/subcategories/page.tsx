"use client"

import { SubcategoriesTable } from "@/components/subcategories-table"
import { PageHeader } from "@/components/page-header"

export default function SubcategoriesPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Subcategories"
        description="Manage your product subcategories"
        buttonText="Add Subcategory"
        buttonLink="/admin/subcategories/new"
      />
      <SubcategoriesTable />
    </div>
  )
}

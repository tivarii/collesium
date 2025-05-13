"use client"

import { CategoriesTable } from "@/components/categories-table"
import { PageHeader } from "@/components/page-header"

export default function CategoriesPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Categories"
        description="Manage your product categories"
        buttonText="Add Category"
        buttonLink="/admin/categories/new"
      />
      <CategoriesTable />
    </div>
  )
}

import { CategoryForm } from "@/components/category-form"
import { PageHeader } from "@/components/page-header"

export default function NewCategoryPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Add Category"
        description="Create a new product category"
        buttonText="Back to Categories"
        buttonLink="/admin/categories"
        buttonVariant="outline"
      />
      <CategoryForm />
    </div>
  )
}

import { SubcategoryForm } from "@/components/subcategory-form"
import { PageHeader } from "@/components/page-header"

export default function NewSubcategoryPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Add Subcategory"
        description="Create a new product subcategory"
        buttonText="Back to Subcategories"
        buttonLink="/admin/subcategories"
        buttonVariant="outline"
      />
      <SubcategoryForm />
    </div>
  )
}

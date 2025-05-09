import { ProductsTable } from "@/components/products-table"
import { PageHeader } from "@/components/page-header"

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Products"
        description="Manage your product inventory"
        buttonText="Add Product"
        buttonLink="/admin/products/new"
      />
      <ProductsTable />
    </div>
  )
}

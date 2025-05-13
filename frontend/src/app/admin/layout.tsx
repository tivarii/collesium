import type React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { CategoryProvider } from "@/contexts/categoryContext"
import { SubCategoryProvider } from "@/contexts/subCategoryContext"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SubCategoryProvider>
    <CategoryProvider>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AdminSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </SidebarProvider>
    </CategoryProvider>
    </SubCategoryProvider>
  )
}

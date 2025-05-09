"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Layers, Package, ShoppingBag, Users, Settings, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
// import { ThemeToggle } from "@/components/theme-toggle"

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex h-14 items-center px-4">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <span className="font-bold text-primary-foreground">TC</span>
            </div>
            <span className="font-semibold">The Colosseum</span>
          </Link>
          <SidebarTrigger className="ml-auto md:hidden" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/admin/dashboard"} tooltip="Dashboard">
              <Link href="/admin/dashboard">
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/admin/categories" || pathname.startsWith("/admin/categories/")}
              tooltip="Categories"
            >
              <Link href="/admin/categories">
                <Layers className="h-5 w-5" />
                <span>Categories</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/admin/subcategories" || pathname.startsWith("/admin/subcategories/")}
              tooltip="Subcategories"
            >
              <Link href="/admin/subcategories">
                <Package className="h-5 w-5" />
                <span>Subcategories</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/admin/products" || pathname.startsWith("/admin/products/")}
              tooltip="Products"
            >
              <Link href="/admin/products">
                <ShoppingBag className="h-5 w-5" />
                <span>Products</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/admin/users"} tooltip="Users">
              <Link href="#">
                <Users className="h-5 w-5" />
                <span>Users</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/admin/settings"} tooltip="Settings">
              <Link href="#">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <div className="flex items-center justify-between p-4">
          {/* <ThemeToggle /> */}
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

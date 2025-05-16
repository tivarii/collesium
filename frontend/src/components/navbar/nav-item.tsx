import Link from "next/link"

interface NavItemProps {
  href: string
  label: string
  isActive?: boolean
}

export function NavItem({ href, label, isActive = false }: NavItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
          isActive
            ? "border-b-2 border-primary text-gray-900"
            : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
        }`}
      >
        {label}
      </Link>
    </li>
  )
}

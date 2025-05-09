import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PageHeaderProps {
  title: string
  description: string
  buttonText?: string
  buttonLink?: string
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}

export function PageHeader({ title, description, buttonText, buttonLink, buttonVariant = "default" }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {buttonText && buttonLink && (
        <Button variant={buttonVariant} asChild>
          <Link href={buttonLink}>{buttonText}</Link>
        </Button>
      )}
    </div>
  )
}

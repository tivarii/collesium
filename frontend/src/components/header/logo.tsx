import Link from "next/link"
import Image from "next/image"

interface LogoProps {
  src: string
  alt: string
  width?: number
}

export function Logo({ src, alt, width = 153 }: LogoProps) {
  return (
    <Link href="/home" className="navbar-brand">
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={width * 0.4}
        title="The Colosseum Logo"
        priority
      />
    </Link>
  )
}

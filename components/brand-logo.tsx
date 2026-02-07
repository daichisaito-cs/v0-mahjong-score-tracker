import Image from "next/image"

interface BrandLogoProps {
  className?: string
  priority?: boolean
}

export function BrandLogo({ className, priority }: BrandLogoProps) {
  const classes = ["h-9 w-auto", className].filter(Boolean).join(" ")
  return <Image src="/janki-logo.png" alt="Janki" width={160} height={60} className={classes} priority={priority} />
}

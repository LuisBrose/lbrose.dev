import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6 max-w-4xl flex justify-center">
        <Link
          href="/impressum"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Impressum
        </Link>
      </div>
    </footer>
  )
}

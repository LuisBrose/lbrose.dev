import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Impressum - Luis Brose",
  description: "Impressum und Kontaktangaben.",
}

export default function ImpressumPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-10">Impressum</h1>

      <div className="space-y-8 text-sm leading-relaxed">
        <div>
          <p className="font-semibold mb-2">Anbieter:</p>
          <p className="text-muted-foreground">
            Luis Brose
            <br />
            c/o COCENTER
            <br />
            Koppoldstr. 1
            <br />
            86551 Aichach
          </p>
        </div>

        <div>
          <p className="font-semibold mb-2">Kontakt:</p>
          <p className="text-muted-foreground">
            E-Mail:{" "}
            <a
              href="mailto:contact@hugosmp-market.net"
              className="text-foreground hover:underline"
            >
              contact@hugosmp-market.net
            </a>
            <br />
            Website:{" "}
            <a
              href="https://lbrose.dev"
              className="text-foreground hover:underline"
            >
              lbrose.dev
            </a>
          </p>
        </div>
      </div>

      <p className="mt-12">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Zurück zur Startseite
        </Link>
      </p>
    </div>
  )
}

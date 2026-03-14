import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Luis Brose",
  "jobTitle": "Full Stack Developer",
  "description": "Full Stack Developer (M.Sc.) at Intero Technologies, an Odoo Gold Partner in Stralsund, Germany. Specializes in Odoo ERP and Python development with a focus on product design and user experience.",
  "url": "https://lbrose.dev",
  "sameAs": [
    "https://github.com/LuisBrose",
    "https://www.linkedin.com/in/luisbrose/"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Intero Technologies",
    "alternateName": "Intero Technologies - Odoo Gold Partner"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Stralsund",
    "addressCountry": "DE"
  }
}

export const metadata: Metadata = {
  title: "Luis Brose - Full Stack Developer",
  description: "Luis Brose - Full Stack Developer (M.Sc.) at Intero Technologies in Stralsund, Germany. Specializes in Odoo ERP and Python development. Passionate about product design and creating intuitive user experiences.",
  icons: {
    icon: [
      { url: "/icon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon/favicon.ico", sizes: "any" },
    ],
    apple: "/icon/apple-touch-icon.png",
  },
  manifest: "/icon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script async defer src="https://platform.linkedin.com/badges/js/profile.js" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

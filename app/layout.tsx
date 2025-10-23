import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _poppins = Poppins({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Clean Port Junk Removal | Bringing Your Space Back to Life!",
  description:
    "Reliable junk removal, demolition, and moving services across Oregon and Washington. Call today for fast and affordable cleanups!",
  openGraph: {
    title: "Clean Port Junk Removal | Bringing Your Space Back to Life!",
    description: "Professional junk removal and demolition services in Oregon & Washington",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Clean Port Junk Removal",
              description: "Professional junk removal, demolition, and moving services",
              areaServed: ["Oregon", "Washington"],
              telephone: "(555) 123-4567",
              priceRange: "$$",
              serviceType: ["Junk Removal", "Demolition", "Moving Services"],
            }),
          }}
        />
      </head>
      <body className={`${_poppins.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Comfortaa } from "next/font/google"
import { Source_Serif_4 } from "next/font/google"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppLayout } from "@/components/app-layout"
import { PageTransition } from "@/components/page-transition"
import { ScrollProgress } from "@/components/scroll-progress"

const comfortaa = Comfortaa({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-comfortaa",
})

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Din digitala kokbok",
  description: "En varm och personlig receptboksapp",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <body className={`${comfortaa.variable} ${sourceSerif.variable} ${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="paper-green"
          enableSystem={false}
          themes={["paper-green", "cocoa", "ocean", "high-contrast", "sepia"]}
        >
          <ScrollProgress />
          <AppLayout>
            <PageTransition>{children}</PageTransition>
          </AppLayout>
          <footer className="hidden md:block mt-auto py-4 text-center">
            <p className="text-xs text-ink-muted opacity-60 hover:opacity-100 transition-opacity">Lisas egna matapp</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}

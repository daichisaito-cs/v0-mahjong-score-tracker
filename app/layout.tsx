import type React from "react"
import type { Metadata, Viewport } from "next"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/next"
import { NavigationProgressBar } from "@/components/navigation-progress-bar"
import "./globals.css"

export const metadata: Metadata = {
  title: "Janki - 麻雀成績管理",
  description: "友達との麻雀の記録を簡単につけて、成績を可視化できるアプリ",
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0f766e",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`font-sans antialiased`}>
        <Suspense fallback={null}>
          <NavigationProgressBar />
        </Suspense>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

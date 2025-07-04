import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ToastProvider } from "../components/toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ascendry - Digital Innovation Studio",
  description:
    "Transform your ideas into digital reality with cutting-edge web development, AI solutions, and innovative design.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}

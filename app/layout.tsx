import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer/footer"
import ScrollToTopButton from "@/components/scroll"
import { Toaster } from "react-hot-toast"
import { cookies } from "next/headers"
import { verifyTokenForPage } from "@/utils/verifyToken"
import { ThemeProvider } from "next-themes"
import LenisProvider from "@/components/LenisProvider"

export const metadata: Metadata = {
  title: "Posts CRUD",
  description: "Managing posts and comments",
  verification: {
    google:
      "google-site-verification=HhxjvoOIKJPQDQMh3nuIjumtc7BER49OhLGswmPGUQE",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const token = cookies().get("jwtToken")?.value ?? ""
  const payload = verifyTokenForPage(token)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 antialiased transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LenisProvider />
          <Toaster position="top-center" />
          <Header payload={payload} />
          <main className="min-h-[calc(100vh-160px)] pt-20 px-4">
            {children}
          </main>
          <Footer />
          <ScrollToTopButton />
        </ThemeProvider>
      </body>
    </html>
  )
}

import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import localFont from "next/font/local";

import "./globals.css";
import Header from "@/components/header";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer/footer";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import ScrollToTopButton from "@/components/scroll";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Posts crud",
  description: "managing posts and comments",
  verification: {
    google: process.env.GOOGLE_COLUD_API,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(cookie);
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="4r77DN--GSwQ_XMNiL6T9tIFrsOYhUBCwmekSl4ehBY"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header payload={payload} />
          <Toaster position="top-right" />
          {children}
          <ScrollToTopButton />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

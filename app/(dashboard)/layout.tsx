import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./providers";
import "../globals.css";
import { Playfair_Display} from "next/font/google"; 

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <Providers>
          {children}
        </Providers>
  )
}


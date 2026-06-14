import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apollo Voyages",
  description: "Luxury India Travel Experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className={dmSans.className} suppressHydrationWarning>
        {children}
        <Footer />
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";
import { Toaster } from "@/components/ui/toaster";

const poppins = localFont({
  src: [
    {
      path: "/fonts/Poppins-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "/fonts/Poppins-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "/fonts/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "/fonts/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "/fonts/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "/fonts/Poppins-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Consise Guy | Learn Code Concisely",
  description:
    "A simple blog project, that will teach you how to code like a pro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="custom-scrollbar">
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <body className={poppins.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen">
            <Navbar />
            {children}
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

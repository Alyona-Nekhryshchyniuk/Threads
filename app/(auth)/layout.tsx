import { ClerkProvider } from "@clerk/nextjs";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Threads",
  description: "Next.js Meta Threads Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <div className="w-full min-h-screen justify-center items-center">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

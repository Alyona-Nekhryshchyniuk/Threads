import { Metadata } from "next";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

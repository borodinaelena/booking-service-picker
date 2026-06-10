import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Booking Service Picker",
  description: "Choose a service and optional add-ons for a barber booking flow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"] }); // ajout de latin-ext pour meilleure couverture

export const metadata: Metadata = {
  title: "HeriTune",
  description: "Patrimoine vocal immatériel du monde",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
import { SITE_TITLE } from "@/lib/constants";
import type { Metadata } from "next";
import "tailwindcss/tailwind.css";
import "./globals.css";

export const metadata: Metadata = {
  title: SITE_TITLE,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body id="__next">{children}</body>
    </html>
  );
}

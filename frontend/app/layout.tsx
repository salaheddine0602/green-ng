import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Green Box | جرين بوكس",
  description:
    "كل صندوق يغيّر طريقة تفكيرك بالمال — every box changes how you think about money.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

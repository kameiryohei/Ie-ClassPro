import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import ImageChanger from "@/components/images/ImageChanger";

const font = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ie-ClassPlanner",
  description: "みんなの履修プランを共有しよう！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={font.className}>
        <Toaster />
        <ImageChanger />
        <Header />
        {children}
      </body>
    </html>
  );
}

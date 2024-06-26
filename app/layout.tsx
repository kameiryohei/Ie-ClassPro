import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

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
        <div className={`fixed top-0 left-0 w-full h-screen z-[-10]`}>
          <Image
            src={"/images/bg.svg"}
            layout={`fill`}
            objectFit={`cover`}
            alt={"背景画像"}
          />
        </div>
        <Toaster />
        <Header />
        <div className="pt-24">{children}</div>
      </body>
    </html>
  );
}

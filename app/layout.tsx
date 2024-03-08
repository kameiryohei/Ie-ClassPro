import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Image from "next/image";
import SupabaseListener from "./components/layout/SupabaseListener";

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
        <SupabaseListener />
        <div className={`fixed top-0 left-0 w-full h-screen z-[-1]`}>
          <Image
            src={`/images/bg.svg`}
            layout={`fill`}
            objectFit={`cover`}
            alt={""}
          />
        </div>
        {children}
      </body>
    </html>
  );
}

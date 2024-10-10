import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // APIへのアクセスに対してのみミドルウェアを適用
  if (req.nextUrl.pathname.startsWith("/api")) {
    // x-api-keyの検証
    const apiKey = req.headers.get("x-api-key");
    if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

// ミドルウェアの適用範囲を指定
export const config = {
  matcher: "/api/:path*", // すべてのAPIエンドポイントに適用
};

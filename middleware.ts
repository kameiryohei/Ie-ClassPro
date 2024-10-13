import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "utils/supabase/middleware";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // updateSession を除外するパスのリスト
  const excludeSessionUpdatePaths = ["/"];

  // `/api` パスに対してのみ API 保護の処理を適用
  if (pathname.startsWith("/api")) {
    const apiKey = req.headers.get("x-api-key");
    if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // excludeSessionUpdatePaths に含まれないパス、かつ /allPost で始まらないパスに対してのみ updateSession を適用
  if (
    !excludeSessionUpdatePaths.includes(pathname) &&
    !pathname.startsWith("/allPost")
  ) {
    const response = await updateSession(req);
    if (response) {
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

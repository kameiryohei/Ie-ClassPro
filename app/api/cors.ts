export function getCorsOrigin() {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  return process.env.NEXT_PUBLIC_VERCEL_URL || "";
}

export const corsHeaders = {
  "Access-Control-Allow-Origin": getCorsOrigin(),
  "Access-Control-Allow-Methods": "GET, OPTIONS", // 許可するメソッド
  "Access-Control-Allow-Headers": "Content-Type", // 許可するリクエストヘッダー
};

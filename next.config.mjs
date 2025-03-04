/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.microcms-assets.io",
      process.env.SUPABASE_DOMAIN, // 環境変数からSupabaseのドメインを取得
    ],
  },
};

export default nextConfig;

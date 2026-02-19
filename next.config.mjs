/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // 動的ページ（認証付き）のRouter Cacheを30秒保持
    // 一度訪れたページへの再訪問が瞬時になる（初期ロードに影響なし）
    staleTimes: {
      dynamic: 30,
    },
  },
}

export default nextConfig
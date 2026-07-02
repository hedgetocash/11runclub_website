/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow iCloud Drive path characters
  experimental: {
    optimizeCss: false,
  },
}

module.exports = nextConfig

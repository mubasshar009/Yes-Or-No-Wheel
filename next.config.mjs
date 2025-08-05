/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  async redirects() {
    return [
      // Redirect any old domain references
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'v0-yes-or-no-wheelmain2.vercel.app',
          },
        ],
        destination: 'https://yesno-wheel.com/:path*',
        permanent: true,
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  }
}

export default nextConfig

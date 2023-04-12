/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains : [process.env.AWS_IMAGE_DOMAIN, process.env.AWS_DISTRIBUTION_DOMAIN]
  }
}

module.exports = nextConfig

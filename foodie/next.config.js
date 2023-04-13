/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains : [process.env.AWS_IMAGE_DOMAIN, process.env.AWS_DISTRIBUTION_DOMAIN, "flowbite.s3.amazonaws.com"]
  }
}

module.exports = nextConfig

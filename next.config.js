/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'links.papareact.com',
      'platform-lookaside.fbsbx.com',
      'firebasestorage.googleapis.com',
      'bit.ly',
    ],
  },
};

module.exports = nextConfig;


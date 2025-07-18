/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverExternalPackages: ["chrome-aws-lambda"],
  },
};

export default nextConfig;

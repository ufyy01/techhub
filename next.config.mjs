/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/localhost:3000/api/v1/hub/:path*',
        destination: `http://localhost:5000/api/v1/hub/:path*`,
      },
    ];
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;

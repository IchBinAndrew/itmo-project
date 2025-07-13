import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
        return [
            {
                // matching all API routes
                source: "/users/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    },
    async rewrites() {
      return [
        {
          source: '/api/users/:path*',
          destination: 'http://localhost/api/users/:path*',
        },
        {
          source: '/api/tasks/list',
          destination: 'http://localhost/api/task/list',
        },
        {
          source: '/api/tasks/upload/image',
          destination: 'http://localhost/api/task/upload/image',
        },
        {
          source: '/api/tasks/upload/text',
          destination: 'http://localhost/api/task/upload/text',
        },
      ]
    }
};

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig;

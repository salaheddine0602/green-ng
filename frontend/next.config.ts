import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev proxy: the browser only ever talks to :3000; /api is forwarded to the
  // Spring Boot backend on :8080, so the backend needs no CORS configuration.
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*",
      },
    ];
  },
};

export default nextConfig;

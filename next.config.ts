import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      new URL('https://yt3.googleusercontent.com/**')
    ]
  },
  logging: { //! Remove for production usage
    fetches: {
      fullUrl: true
    }
  }
};

export default nextConfig;

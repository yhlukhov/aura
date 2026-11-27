import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      new URL('https://yt3.googleusercontent.com/**'),
      new URL('https://encrypted-tbn**.gstatic.com/**'),
    ],
  },
}

export default nextConfig;

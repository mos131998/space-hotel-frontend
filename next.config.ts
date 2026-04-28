import type { NextConfig } from "next";
import "@/config/env.validation";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

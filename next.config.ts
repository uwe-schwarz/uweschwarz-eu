import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
    useTypeScriptCli: true,
  },
  typedRoutes: true,
};

export default nextConfig;

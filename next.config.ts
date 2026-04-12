import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  transpilePackages: ["@tanstack/query-core", "@tanstack/react-query"],
  turbopack: {
    resolveAlias: {
      "@tanstack/query-core": "./node_modules/@tanstack/query-core/src/index.ts",
      "@tanstack/react-query": "./node_modules/@tanstack/react-query/src/index.ts",
    },
  },
  typedRoutes: true,
};

export default nextConfig;

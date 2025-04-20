import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage-voice.drip.id",
      },
    ],
  },
  webpack: (config) => {
    config.ignoreWarnings = [{ module: /node_modules\/knex/ }];
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "better-sqlite3": false,
      "pg-native": false,
      "pg-query-stream": false,
      oracledb: false,
      mysql: false,
      mysql2: false,
      sqlite3: false,
      tedious: false,
    };

    return config;
  },
};

export default nextConfig;

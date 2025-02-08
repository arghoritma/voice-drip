import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // Mengatasi warning dari Knex
    config.ignoreWarnings = [{ module: /node_modules\/knex/ }];

    // Mengatasi masalah fallback dependencies
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

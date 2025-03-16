/* eslint-disable @typescript-eslint/no-require-imports */
const pkg = require("./package.json");
require("dotenv").config();

module.exports = {
  apps: [
    {
      name: pkg.name,
      script: "npm",
      args: "start",
      exec_mode: "cluster",
      instances: -1,
    },
    {
      name: `${pkg.name}_storage`,
      script: "./storage_server.js",
      exec_mode: "cluster",
      instances: 1,
      env: {
        PORT: process.env.STORAGE_PORT,
      },
    },
  ],
};

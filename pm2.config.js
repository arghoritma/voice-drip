/* eslint-disable @typescript-eslint/no-require-imports */
const pkg = require("./package.json");
require("dotenv").config();

module.exports = {
  apps: [
    {
      name: pkg.name, // Misalnya "voice"
      script: "npm",
      args: "start",
      exec_mode: "fork", // Ganti ke "fork" agar tidak ada konflik port
      instances: 1, // Hanya satu instance untuk Next.js
      env: {
        PORT: process.env.PORT || "4000", // Gunakan PORT dari .env atau default ke 4000
      },
    },
    {
      name: `${pkg.name}_storage`, // Misalnya "voice_storage"
      script: "./storage_server.js",
      exec_mode: "fork", // Gunakan "fork" untuk simplicitiy, kecuali clustering diperlukan
      instances: 1, // Tetap satu instance untuk storage
      env: {
        PORT: process.env.STORAGE_PORT || "4001", // Port berbeda dari Next.js
      },
    },
  ],
};

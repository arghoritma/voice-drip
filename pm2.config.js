const pkg = require("./package.json");
require("dotenv").config();

module.exports = {
  apps: [
    {
      name: pkg.name, // Menggunakan nama dari package.json
      script: "npm",
      args: "start",
      exec_mode: "cluster",
      instances: -1,
      env: {
        PORT: process.env.PORT,
        NODE_ENV: process.env.NODE_ENV,
      },
    },
    {
      name: `${pkg.name}_storage`, // Menambahkan suffix '_storage' ke nama aplikasi
      script: "./storage_server.js",
      exec_mode: "cluster",
      instances: 1,
      env: {
        PORT: process.env.STORAGE_PORT,
      },
    },
  ],
};

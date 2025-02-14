const pkg = require("./package.json");

module.exports = {
  apps: [
    {
      name: pkg.name, // Menggunakan nama dari package.json
      script: "./node_modules/next/dist/bin/next",
      args: "start",
      exec_mode: "cluster",
      instances: -1,
      env: {
        PORT: process.env.PORT || 3000,
      },
    },
    {
      name: `${pkg.name}_storage`, // Menambahkan suffix '_storage' ke nama aplikasi
      script: "./storage_server.js",
      exec_mode: "cluster",
      instances: 1,
      env: {
        PORT: process.env.STORAGE_PORT || 5000,
      },
    },
  ],
};

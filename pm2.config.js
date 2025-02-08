module.exports = {
  apps: [
    {
      name: "argonext",
      script: "./node_modules/next/dist/bin/next",
      args: "start",
      exec_mode: "cluster",
      instances: -1,
    },
    {
      name: "argonext_storage",
      script: "./storage_server.js",
      exec_mode: "cluster",
      instances: 1,
    },
  ],
};

/* eslint-disable @typescript-eslint/no-require-imports */
var liveServer = require("live-server");
var dotenv = require("dotenv");
dotenv.config();

var params = {
  port: process.env.STORAGE_PORT,
  host: process.env.STORAGE_HOST,
  root: process.env.STORAGE_ROOT,
  open: false,
  file: "index.html",
  wait: 1000,
  logLevel: 2,
};

liveServer.start(params);

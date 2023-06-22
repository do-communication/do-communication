const express = require("express");
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  const server = express();
  server.get("/service-worker.jsx", (req, res) => {
    app.serveStatic(req, res, "./.next/service-worker.jsx");
  });
  //scoping the service workers
  const serviceWorkers = [
    {
      filename: "service-worker.js",
      path: "./.next/service-worker.jsx",
    },
    {
      filename: "firebase-messaging-sw.jsx",
      path: "./public/firebase-messaging-sw.jsx",
    },
  ];
  serviceWorkers.forEach(({ filename, path }) => {
    server.get(`/${filename}`, (req, res) => {
      app.serveStatic(req, res, path);
    });
  });
  server.get("*", (req, res) => {
    return handle(req, res);
  });
  server.listen(port, (err) => {
    if (err) throw err;
  });
});

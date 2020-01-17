const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api",
    proxy({
      target: "http://localhost:2222",
      changeOrigin: true
    })
  );
};

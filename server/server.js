const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(router);

server.listen(3000, () => {
  console.log("Back-end is running!");
});

/**
 * TODO authorization by route
 *
 * products
 * product_images
 * product_avaliations
 * users
 * orders
 * profiles
 */
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }

  // Continue to JSON Server router

  next();
});

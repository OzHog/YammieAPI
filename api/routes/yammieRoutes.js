const orders = require("../controllers/yammieController");
const logger = require("../../utils/logger");

const routes = (app) => {
  app.route("/orders").get(orders.lastDayOrders).post(orders.createOrder);

  //middleware - 404 path not found
  app.use((req, res) => {
    res.status(404).json({
      message: "Path Not Found",
      path: req.originalUrl,
    });
    logger.error(
      `${res.statusCode} ${res.statusMessage} - ${req.method} ${req.originalUrl} - ${req.ip} `
    );
  });

  //middleware - 500 server error
  app.use((req, res) => {
    res.status(500).json({
      message: "Server Error",
    });
    logger.error(
      `${res.statusCode} ${res.statusMessage} - ${req.method} ${req.originalUrl} - ${req.ip}`
    );
  });
};

module.exports = routes;

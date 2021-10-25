require("../models/yammieModel"); //load Orders model

const mongoose = require("mongoose");
const Orders = mongoose.model("Orders");
const logger = require("../../utils/logger");

exports.listAllOrders = (req, res) => {
  Orders.find({}, (err, order) => {
    if (err) res.send(err);
    res.json(order);
  });
};

exports.lastDayOrders = (req, res) => {
  const today = new Date();

  Orders.find({ created_date: { $gte: today.toLocaleDateString("en-US") } })
    .then((today_Orders) => {
      res.status(200).json({
        message: "Orders from last day",
        orders: today_Orders,
      });
      logger.info(
        `${res.statusCode} ${res.statusMessage} - ${req.method} ${req.originalUrl} - ${req.ip}`
      );
    })
    .catch((err) => {
      res.status(400).send(err,
      );
      logger.error(
        `${res.statusCode} ${res.statusMessage} - ${req.method} ${req.originalUrl} - ${req.ip} | ${err.message}`
      );
    });
};

exports.createOrder = (req, res) => {
  const new_order = new Orders(req.body);
  new_order
    .save()
    .then((order) => {
      res.status(201).json({
        message: "Created order successfully",
        order: order,
      });
      logger.info(
        `${res.statusCode} ${res.statusMessage} - ${req.method} ${req.originalUrl} - ${req.ip} | New Order: ${order.customer_name} ordered ${order.details.length} dishes`
      );
    })
    .catch((err) => {
      res.status(400).send(err);
      logger.error(
        `${res.statusCode} ${res.statusMessage} - ${req.method} ${req.originalUrl}  - ${req.ip}  | ${err.message}`
      );
    });
};

exports.deleteOrder = (req, res) => {
  Orders.remove({ _id: req.params.orderId })
    .then(() => {
      res.status(200).json({ message: "order successfully deleted" });
      logger.info(
        `${res.statusCode} ${res.statusMessage} - ${req.method} ${req.originalUrl} - ${req.ip} | OrderID: ${req.params.orderId}`
      );
    })
    .catch((err) => {
        res.status(204).send(err)
        logger.error(
            `${res.statusCode} ${res.statusMessage} - ${req.method} ${req.originalUrl}  - ${req.ip}  | ${err.message}`
          );
    });
};

exports.deleteAllOrder = (req, res) => {
  Orders.deleteMany()
    .then(() => {
      res.json({ message: "orders successfully deleted" });
    })
    .catch((err) => res.status(400).send(err));
};

const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost/Yammiedb";
const logger = require("../utils/logger");

const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(DB_URL).then((res, err) => {
      logger.info(`Database started and running on ${DB_URL}`);
        resolve();
    }).catch(err => {
      logger.error(`${err}`);
      reject(err)
    });
  });
};

const close = () => {
  logger.info(`Database close`);
  return mongoose.disconnect();
};

module.exports = { connect, close };

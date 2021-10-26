const mongoose = require("mongoose");
const Mockgoose = require("mockgoose").Mockgoose;
const logger = require("../utils/logger");

const DB_URL = "mongodb://localhost/Yammiedb";

const connect = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "test") {
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage().then(() => {
        mongoose
          .connect(DB_URL)
          .then((res, err) => {
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    } else {
      mongoose
        .connect(DB_URL)
        .then((res, err) => {
          logger.info(`Database started and running on ${DB_URL}`);
          resolve();
        })
        .catch((err) => {
          logger.error(`${err}`);
          reject(err);
        });
    }
  });
};

const close = () => {
  logger.info(`Database close`);
  return mongoose.disconnect();
};

module.exports = { connect, close };

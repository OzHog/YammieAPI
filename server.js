const app = require("./app");
const db = require("./db/yammieDB");
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3000;
const HOST = "localhost";

db.connect()
  .then(() => {
    app.listen(port, () => {
      logger.info(`Yammie orders RESTful API server started and running on http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    db.close();
    logger.info(`${err}`);
  });

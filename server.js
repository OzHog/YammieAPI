const app = require("./app");
const db = require("./db/yammieDB");
const logger = require('./utils/logger');

const port = process.env.PORT || 3000;
const host = "localhost";

db.connect()
  .then(() => {
    app.listen(port, () => {
      logger.info(`Yammie orders RESTful API server started and running on http://${host}:${port}`);
    });
  })
  .catch((err) => console.log(err));

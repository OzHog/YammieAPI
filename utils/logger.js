const { createLogger, format, transports } = require("winston");

 const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "logs/server.log",
    }),
  ],
  format: format.combine(
    format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    format.align(),
    format.printf(
      (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
    )
  ),
});

// exports.log(type, httpStatus, httpRequest, requestIP, extraData)
// {
//   switch(type){
//     case "info":

//   }
// }

module.exports = logger

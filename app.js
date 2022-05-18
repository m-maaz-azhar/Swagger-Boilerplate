const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/index");
const { NODE_ENV, PORT } = require("./config/config");
const app = require("./config/express");
const logger = require("./services/logger/logger");
const { LOGGER_TAGS } = require("./utils/constants");
const { configureSequelize } = require("./config/sequelizeConfig");

// global exception handler for logging errors
process
  .on("unhandledRejection", (reason, p) => {
    logger.critical(
      LOGGER_TAGS.FOOTPRINT,
      `From global Exception handler ${reason} Unhandled Rejection at Promise${p}`
    );
  })
  .on("uncaughtException", (err) => {
    // also logging ifS any unhandled exception occurred
    logger.critical(
      LOGGER_TAGS.FOOTPRINT,
      `From global Exception handler Unhandled error occurred ${err}`
    );
  });

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// listen to requests
app.listen(PORT, () => {
  logger.info(
    LOGGER_TAGS.FOOTPRINT,
    `Server started/restarted on port ${PORT} DateTime:${new Date()}`
  );
  logger.info(LOGGER_TAGS.FOOTPRINT, `NODE_ENV=${NODE_ENV}`);
});

// open db connection
configureSequelize();

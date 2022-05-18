const logger = require("../../services/logger/logger");
const { LOGGER_TAGS } = require("../../utils/constants");

module.exports = function logRequest(req, res, next) {
  try {
    const url = req.originalUrl.toLocaleLowerCase();
    if (
      url.indexOf("/login") === -1 &&
      url.indexOf("/register") === -1 &&
      url.indexOf("/api") > -1
    ) {
      const loggerMessage = `${req.method} ${
        req.originalUrl
      } RequestBody:${JSON.stringify(req.body)} : Server Time -> ${new Date()}`;
      logger.info(LOGGER_TAGS.FOOTPRINT, loggerMessage);
    }
  } catch (error) {
    logger.error(
      LOGGER_TAGS.FOOTPRINT,
      `Error in requestLogger middlerware errorMessage:${error.message} stack:${
        error.stack
      } errorObject: ${JSON.stringify(error)}`
    );
  }
  next();
};

const logger = require("../../services/logger/logger");
const {
  successResponse,
  internalServerErrorResponse,
  constructResponse,
} = require("../../utils/responseFormatter");
const { HTTP_STATUS, LOGGER_TAGS } = require("../../utils/constants");
/**
 * post log
 */
exports.post = async (req, res) => {
  let responseData;
  try {
    const { message } = req.body;
    await logger.clientError(message);
    responseData = successResponse(
      message,
      HTTP_STATUS.CREATED,
      "Log created successfully"
    );
  } catch (error) {
    logger.error(
      LOGGER_TAGS.FOOTPRINT,
      `Log controller.post(errorMessage:${error.message} stack:${
        error.stack
      } errorObject: ${JSON.stringify(error)}`
    );
    responseData = internalServerErrorResponse();
  }
  return constructResponse(res, responseData);
};

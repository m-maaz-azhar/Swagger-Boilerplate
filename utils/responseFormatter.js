const logger = require("../services/logger/logger");
const { LOGGER_TAGS, HTTP_STATUS } = require("./constants");

const successResponse = (data, httpStatusCode, successMessage = "") => {
  if (!data || !httpStatusCode) {
    logger.error(
      LOGGER_TAGS.FOOTPRINT,
      `Success response has either no data=${data} or httpStatusCode=${httpStatusCode}`
    );
  }
  return {
    data: data,
    status: httpStatusCode || HTTP_STATUS.OK,
    message: successMessage,
    success: true,
  };
};

const errorResponse = (httpStatusCode, errorMessage, data = null) => {
  if (!httpStatusCode || !errorMessage) {
    logger.error(
      LOGGER_TAGS.FOOTPRINT,
      `Error response has either no errorMessage=${errorMessage} or httpStatusCode=${httpStatusCode}`
    );
  }
  return {
    data,
    status: httpStatusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: errorMessage || "Internal server error. Please try again later.",
    success: false,
  };
};

const internalServerErrorResponse = (message = null) =>
  errorResponse(
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message || "Internal server error.Please try again later."
  );

const constructResponse = (expressResponseObject, responseData) => {
  if (responseData.success) {
    return expressResponseObject.status(responseData.status).send({
      data: responseData.data,
      message: responseData.message,
      success: true,
    });
  }
  if (responseData.data) {
    return expressResponseObject.status(responseData.status).send({
      data: responseData.data,
      message: responseData.message,
      success: false,
    });
  }
  return expressResponseObject.status(responseData.status).send({
    message: responseData.message,
    success: false,
  });
};

const logBadRequestAndResponse = (
  expressRequestObject,
  expressResponseObject,
  errors
) => {
  const loggerMessage = `${expressRequestObject.method} ${
    expressRequestObject.originalUrl
  } RequestBody:${JSON.stringify(
    expressRequestObject.body
  )} Validation Errors: ${JSON.stringify(errors)}`;
  logger.error(loggerMessage);
  return expressResponseObject.status(HTTP_STATUS.BAD_REQUEST).json({
    errors: errors.array({
      onlyFirstError: true,
    }),
  });
};
module.exports = {
  successResponse,
  errorResponse,
  internalServerErrorResponse,
  constructResponse,
  logBadRequestAndResponse,
};

const { grayLog, additionalFields } = require("./graylog");
const winston = require("./winston");
const { LOGGER_TAGS } = require("../../utils/constants");
const { logs } = require("../../config/config");

const logger = {};
const tagsArray = Object.values(LOGGER_TAGS);
const getLogLevel = () => logs.debugLevel;

// checking if developer consider first parameter tag as message. Because previoulsy first parameter was message but now it is tag.
const getMessageAndAdditionalFields = (tag, message) => {
  let updatedMessage = message;
  const fields = additionalFields;
  if (tag && (typeof tag === "string" || tag instanceof String)) {
    if (tagsArray.indexOf(tag.toLowerCase()) >= 0) {
      fields.Tag = tag.toLowerCase();
    } else {
      updatedMessage = message ? `${tag} ${message}` : tag;
      fields.Tag = LOGGER_TAGS.FOOTPRINT;
    }
  } else {
    updatedMessage = tag;
    fields.Tag = LOGGER_TAGS.FOOTPRINT;
  }

  return {
    fields,
    updatedMessage,
  };
};

/** 
If we are running from local our environment veriable for LOG_LEVEL will not be sent
and we do't want to send gray logs from local system. *  */
logger.emergency = (tag, message, ...options) =>
  new Promise((resolve, reject) => {
    try {
      if (logs.enableLogs && logs.enableGrayLog) {
        const { updatedMessage, fields } = getMessageAndAdditionalFields(
          tag,
          message
        );
        if (!getLogLevel()) console.log(updatedMessage, ...options);
        else grayLog.emergency(`${updatedMessage},${options}`, fields);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
logger.alert = (tag, message, ...options) =>
  new Promise((resolve, reject) => {
    try {
      if (logs.enableLogs && logs.enableGrayLog) {
        const { updatedMessage, fields } = getMessageAndAdditionalFields(
          tag,
          message
        );
        if (!getLogLevel()) console.log(updatedMessage, ...options);
        else grayLog.alert(`${updatedMessage},${options}`, fields);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });

logger.critical = (tag, message, ...options) =>
  new Promise((resolve, reject) => {
    try {
      if (logs.enableLogs) {
        const { updatedMessage, fields } = getMessageAndAdditionalFields(
          tag,
          message
        );
        if (logs.enableWinstonLog) {
          winston.winstonExports.appLog(`${updatedMessage}, ${options}`, false);
          winston.winstonExports.critical(`${updatedMessage}, ${options}`);
        }
        if (logs.enableGrayLog)
          if (!getLogLevel()) console.log(updatedMessage, ...options);
          else grayLog.critical(`${updatedMessage},${options}`, fields);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });

logger.error = (tag, message, ...options) =>
  new Promise((resolve, reject) => {
    try {
      if (logs.enableLogs) {
        const { updatedMessage, fields } = getMessageAndAdditionalFields(
          tag,
          message
        );
        if (logs.enableWinstonLog) {
          winston.winstonExports.appLog(`${updatedMessage}, ${options}`, false);
          winston.winstonExports.error(`${updatedMessage}, ${options}`);
        }
        if (logs.enableGrayLog)
          if (!getLogLevel()) console.log(updatedMessage, ...options);
          else grayLog.error(`${updatedMessage},${options}`, fields);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
logger.warning = (tag, message, ...options) =>
  new Promise((resolve, reject) => {
    try {
      if (logs.enableLogs && logs.enableGrayLog) {
        const { updatedMessage, fields } = getMessageAndAdditionalFields(
          tag,
          message
        );
        if (!getLogLevel()) console.log(updatedMessage, ...options);
        else grayLog.warning(`${updatedMessage},${options}`, fields);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });

logger.notice = (tag, message, ...options) =>
  new Promise((resolve, reject) => {
    try {
      if (logs.enableLogs && logs.enableGrayLog) {
        const { updatedMessage, fields } = getMessageAndAdditionalFields(
          tag,
          message
        );
        if (!getLogLevel()) console.log(updatedMessage, ...options);
        else grayLog.notice(`${updatedMessage},${options}`, fields);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });

logger.info = (tag, message, ...options) =>
  new Promise((resolve, reject) => {
    try {
      if (logs.enableLogs) {
        const { updatedMessage, fields } = getMessageAndAdditionalFields(
          tag,
          message
        );
        if (logs.enableWinstonLog) {
          winston.winstonExports.appLog(`${updatedMessage}, ${options}`, true);
          winston.winstonExports.info(`${updatedMessage}, ${options}`);
        }
        if (logs.enableGrayLog)
          if (!getLogLevel()) console.log(updatedMessage, ...options);
          else {
            grayLog.info(`${updatedMessage},${options}`, fields);
          }
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });

logger.debug = (tag, message, ...options) =>
  new Promise((resolve, reject) => {
    try {
      if (logs.enableLogs && logs.enableGrayLog) {
        const { updatedMessage, fields } = getMessageAndAdditionalFields(
          tag,
          message
        );
        if (!getLogLevel() || getLogLevel() !== "debug")
          console.log(updatedMessage, ...options);
        else grayLog.debug(`${updatedMessage},${options}`, fields);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });

const clientadditionalFields = {
  Project: "ascensio",
  Environment: process.env.NODE_ENV,
  Module: "webapp",
};

logger.clientError = (message, ...options) =>
  new Promise((resolve, reject) => {
    try {
      winston.winstonExports.appLog(
        `CLIENT ERROR : ${message}, ${options}`,
        false
      );
      winston.winstonExports.error(`CLIENT ERROR : ${message}, ${options}`);
      if (!getLogLevel()) console.log(message);
      else grayLog.error(`${message},${options}`, clientadditionalFields);
      resolve();
    } catch (error) {
      reject(error);
    }
  });

module.exports = logger;

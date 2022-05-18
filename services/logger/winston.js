const winston = require("winston");
const path = require("path");
const { logs } = require("../../config/config");
require("winston-daily-rotate-file");

const logsPath = path.join(__dirname, "../../", "ascensio-logs");

const LOG_FILE_NAMES = {
  INFO: "info-logs.log",
  ERROR: "error-logs.log",
  CRITICAL: "critical-logs.log",
  APPLICATION: "application-logs.log",
};

const LOG_LEVELS = {
  DEBUG: "debug",
  INFO: "info",
  ERROR: "error",
};

const getFileOptions = (level, filename, handleExceptions) => ({
  level: level,
  filename: `${logsPath}/${filename}`,
  handleExceptions: handleExceptions,
  json: false,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  colorize: true,
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD hh:mm:ss A ZZ",
    }),
    winston.format.json()
  ),
});

const getConsoleOptions = (level, handleExceptions) => ({
  level: level,
  handleExceptions: handleExceptions,
  json: false,
  colorize: true,
});

const infoOptions = {
  file: getFileOptions(LOG_LEVELS.info, LOG_FILE_NAMES.INFO, false),
  console: getConsoleOptions(LOG_LEVELS.DEBUG, false),
};

const errorOptions = {
  file: getFileOptions(LOG_LEVELS.error, LOG_FILE_NAMES.ERROR, true),
  console: getConsoleOptions(LOG_LEVELS.ERROR, true),
};

const criticalOptions = {
  file: getFileOptions(LOG_LEVELS.error, LOG_FILE_NAMES.CRITICAL, false),
  console: getConsoleOptions(LOG_LEVELS.error, false),
};

const allLogsOptions = {
  file: getFileOptions(LOG_LEVELS.info, LOG_FILE_NAMES.APPLICATION, true),
  console: getConsoleOptions(LOG_LEVELS.info, false),
};

// instantiate a new Winston Logger with the settings defined above
const createLogger = (name, filename, options) => {
  const transports = [];
  if (logs.enableWinstonLog) {
    transports.push(
      new winston.transports.DailyRotateFile({
        name: name,
        datePattern: "YYYY-MM-DD",
        filename: path.join(logsPath.toString(), filename),
      }),
      new winston.transports.File(options.file)
    );
  }
  transports.push(new winston.transports.Console(options.console));

  return winston.createLogger({
    timestamp: true,
    transports: transports,
    exitOnError: false, // do not exit on handled exceptions
  });
};

const log = createLogger("info-logs", LOG_FILE_NAMES.INFO, infoOptions);
const error = createLogger("error-logs", LOG_FILE_NAMES.ERROR, errorOptions);
const critical = createLogger(
  "critical-logs",
  LOG_FILE_NAMES.CRITICAL,
  criticalOptions
);
const appLog = createLogger(
  "application-logs",
  LOG_FILE_NAMES.APPLICATION,
  allLogsOptions
);

// create a stream object with a 'write' function that will be used by `morgan`
log.stream = {
  write(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    log.info(message);
  },
};

const winstonExports = {
  info(msg) {
    log.info(msg);
  },
  error(msg) {
    error.error(msg);
  },
  critical(msg) {
    critical.error(msg);
  },
  appLog(msg, isInfo) {
    if (!isInfo) {
      appLog.error(msg);
    } else {
      appLog.info(msg);
    }
  },
};

module.exports = { log, winstonExports };

const dotenv = require("dotenv");
const { ENVIRONMENTS } = require("../utils/constants");

// load env variables from the selected enviornment .env files
dotenv.config();

const sslEnabled = process.env.NODE_ENV !== ENVIRONMENTS.LOCAL;

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  sslEnabled,
  logs: {
    debugLevel: process.env.LOGS_DEBUG_LEVEL,
    enableLogs: process.env.LOGS_ENABLE_LOGS === "true",
    enableGrayLog: process.env.LOGS_ENABLE_GRAYLOG === "true",
    enableWinstonLog: process.env.LOGS_ENABLE_WINSTON === "true",
  },
  rds: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: "mysql",
    charset: "utf8",
    collate: "utf8_general_ci",
    freezeTableName: true,
    dialectOptions: {
      ...(sslEnabled && { ssl: "Amazon RDS" }),
    },
  },
};

const { initialize, checkDBConnection } = require("../data/models/index");
const logger = require("../services/logger/logger");
const { LOGGER_TAGS } = require("../utils/constants");

const { rds } = require("./config");

const configureSequelize = async () => {
  let sequelize = null;
  try {
    sequelize = await initialize(rds);
    checkDBConnection(sequelize);
  } catch (error) {
    logger.error(
      LOGGER_TAGS.FOOTPRINT,
      `Error in sequelizeConfig  errorMessage:${error.message} stack:${
        error.stack
      } errorObject: ${JSON.stringify(error)}`
    );
  }
  return sequelize;
};

module.exports = { configureSequelize };

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const mysql = require("mysql2/promise");
const logger = require("../../services/logger/logger");
const { LOGGER_TAGS } = require("../../utils/constants");

const basename = path.basename(__filename);

// create db if it doesn't already exist
const createDbIfNotExist = async ({
  host,
  port,
  username,
  password,
  database,
}) => {
  const connection = await mysql.createConnection({
    host,
    port,
    user: username,
    password,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
};

const initialize = async ({
  database,
  username,
  password,
  dialect,
  host,
  port,
  charset,
  freezeTableName,
  dialectOptions,
  collate,
}) => {
  const opts = {
    dialect: dialect,
    host: host,
    define: {
      charset: charset,
      freezeTableName: freezeTableName,
      dialectOptions: { collate: collate },
    },
    dialectOptions,
  };

  await createDbIfNotExist({ host, port, username, password, database });
  return new Sequelize(database, username, password, opts);
};

// automatically register association between the models, whenever new model is declared
const associateModels = (sequelize) => {
  const db = {};
  fs.readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
};

const checkDBConnection = async (sequelize) => {
  try {
    await sequelize.authenticate();
    logger.info(
      LOGGER_TAGS.FOOTPRINT,
      `DB Connection has been established successfully.}`
    );
  } catch (error) {
    logger.error(
      LOGGER_TAGS.FOOTPRINT,
      `Log app.js Unable to connect to the database (errorMessage:${
        error.message
      } stack:${error.stack} errorObject: ${JSON.stringify(error)}`
    );
  }
};

module.exports = {
  initialize,
  checkDBConnection,
  associateModels,
};

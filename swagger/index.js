const { basicInfo, server } = require("./config");
const schemas = require("./schemas");
const tags = require("./tags");
const paths = require("./paths");

module.exports = {
  ...basicInfo,
  ...server,
  ...schemas,
  ...tags,
  ...paths,
};

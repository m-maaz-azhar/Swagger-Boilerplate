const { getHealth } = require("./health");

module.exports = {
  paths: {
    "/health": {
      ...getHealth,
    },
  },
};

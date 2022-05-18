const securitySchema = require("./securitySchema");

module.exports = {
  components: {
    ...securitySchema,
  },
};

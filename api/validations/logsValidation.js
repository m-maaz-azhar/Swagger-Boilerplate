const {
  stringWithMandatoryValidation,
  concatValidations,
} = require("./common");

const postLogsValidations = () => {
  const logMessageValidation = stringWithMandatoryValidation(
    "message",
    1,
    5000
  );
  return concatValidations(logMessageValidation);
};

module.exports = {
  postLogsValidations,
};

const { validateResult } = require("./common");
const { logBadRequestAndResponse } = require("../../utils/responseFormatter");

const validateRequest = (req, res, next) => {
  const errors = validateResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return logBadRequestAndResponse(req, res, errors);
};

module.exports = validateRequest;

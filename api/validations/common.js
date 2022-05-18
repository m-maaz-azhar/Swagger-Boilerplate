const { check, validationResult } = require("express-validator");

const stringWithMandatoryValidation = (
  param = "param",
  minLength = 1,
  maxLength = 100
) => {
  const paramName = param;
  return [
    check(paramName)
      .notEmpty({ ignore_whitespace: true })
      .withMessage(`${param} is required`)
      .isLength({ min: minLength, max: maxLength })
      .withMessage(`Length should be ${minLength} to ${maxLength} in ${param}`),
  ];
};

// this will concate all array into one array
const concatValidations = (...arraysOfArray) => [].concat(arraysOfArray);

module.exports = {
  concatValidations,
  stringWithMandatoryValidation,
  validateResult: validationResult,
};

const express = require("express");
const controller = require("../controllers/logs.controller");
const { postLogsValidations } = require("../validations/logsValidation");
const validateRequest = require("../validations/validateRequest");

const router = express.Router();

router
  .route("/")
  /**
   * insert log
   */
  .post(postLogsValidations(), validateRequest, controller.post);

module.exports = router;

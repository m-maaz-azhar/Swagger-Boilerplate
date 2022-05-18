const express = require("express");
const controller = require("../controllers/test.controller");

const router = express.Router();

router
  .route("/")
  /**
   * list
   */
  .get(controller.list);

module.exports = router;

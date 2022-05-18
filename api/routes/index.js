const express = require("express");
const { NODE_ENV } = require("../../config/config");
const testRoutes = require("./test.route");
const logRoutes = require("./log.route");

const router = express.Router();

/**
 * Get /status
 */
router.get("/", (req, res) => res.send(`OK ${NODE_ENV}.`));
router.get("/health", (req, res) => res.send(`OK ${NODE_ENV}.`));

router.use("/test", testRoutes);
router.use("/api/logs", logRoutes);

module.exports = router;

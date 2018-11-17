const router = require("express").Router();

const factorRoutes = require("./factor");
router.use("/problems", factorRoutes)

module.exports = router;

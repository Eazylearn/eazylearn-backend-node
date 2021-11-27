const Express = require("express");
const router = Express.Router();

const accountRoutes = require("./account_routes");
const courseRoutes = require("./course_routes");

router.use("/account", accountRoutes);
router.use("/course", courseRoutes);
// more routes here

module.exports = router;

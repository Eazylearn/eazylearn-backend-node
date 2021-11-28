const Express = require("express");
const router = Express.Router();

const accountRoutes = require("./account_routes");
const courseRoutes = require("./course_routes");
const questionRoutes = require("./question_routes");

router.use("/account", accountRoutes);
router.use("/course", courseRoutes);
router.use("/question", questionRoutes);
// more routes here

module.exports = router;

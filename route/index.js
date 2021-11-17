const Express = require("express");
const router = Express.Router();

const userRoutes = require("./account_routes");

router.use("/user", userRoutes);
// more routes here

module.exports = router;

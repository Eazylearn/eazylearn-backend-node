const Express = require("express");
const router = Express.Router();

const accountRoutes = require("./account_routes");

router.use("/account", accountRoutes);
// more routes here

module.exports = router;

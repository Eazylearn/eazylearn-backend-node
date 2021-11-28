const router = require("express").Router();

const auth = require("../middleware/auth");
const AccountService = require("../service/account_service");

const userService = new AccountService();

router.post("/create", async (req, res) => {
	try {
		token = await userService.signUp(req.body);
		return res.status(200).json({ status: "OK", token: token });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});

router.post("/login", async (req, res) => {
	try {
		token = await userService.login(req.body);
		return res.status(200).json({ status: "OK", token: token });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});

module.exports = router;

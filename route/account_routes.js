const router = require("express").Router();
const Error = require("../model/error");
const auth = require("../middleware/auth");
const AccountService = require("../service/account_service");

const userService = new AccountService();

router.post("/create", auth, async (req, res) => {
	try {
		if (req.user.type) throw new Error("Unauthorized", 401);
		const { successful, duplicates } = await userService.createAccount(
			req.body
		);
		return res
			.status(200)
			.json({ status: "OK", successful: successful, duplicates: duplicates });
	} catch (err) {
		console.log(err);
		const { message, successful, badRequests, duplicates } = err.message;
		return res.status(err.statusCode).json({
			message: message,
			successful: successful,
			badRequests: badRequests,
			duplicates: duplicates,
			statusCode: err.statusCode,
		});
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

router.get("/", auth, async (req, res) => {
	try {
		console.log(req.user.account_id);
		const result = await userService.getAccountByID(req.user.account_id);
		return res.status(200).json({ status: "OK", user: result });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});
module.exports = router;

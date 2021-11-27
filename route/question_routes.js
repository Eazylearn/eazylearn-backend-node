const router = require("express").Router();

const auth = require("../middleware/auth");
const Error = require("../model/error");
const QuestionService = require("../service/question_service");

const questionService = new QuestionService();
/*
router.post("/create", async (req, res) => {
	try {
		token = await userService.create(req.body);
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
*/
router.post("/", auth, async (req, res) => {
	try {
		const type = req.user.type;
		if (type !== 1) throw new Error("Unauthorized", 401);

		const result = await questionService.createQuestion(req.body);
		return res.status(200).json({ status: "OK", message: result });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});
router.get("/", auth, async (req, res) => {
	try {
		const type = req.user.type;
		if (type !== 1) throw new Error("Unauthorized", 401);

		const questionID = req.query.id;
		if (questionID != null) {
			const result = await questionService.getQuestionByID(questionID);
			return res.status(200).json({ status: "OK", question: result });
		}
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});

router.put("/", auth, async (req, res) => {
	try {
		const type = req.user.type;
		if (type !== 1) throw new Error("Unauthorized", 401);

		const questionID = req.query.id;
		if (questionID == null) throw new Error("Bad request", 401);
		console.log("here");
		const result = await questionService.updateQuestionByID(questionID, req.body);
		return res.status(200).json({ status: "OK", message: result });
	} catch (err) {
		console.log(err.statusCode);
		return res.status(err.statusCode).json(err);
	}
});
router.delete("/", auth, async (req, res) => {
	try {
		const type = req.user.type;
		if (type !== 1) throw new Error("Unauthorized", 401);

		const id = req.query.id;
		const response = await questionService.deleteQuestionByID(id);
		return res.status(200).json({ 
			status: "OK",
			message: response + " question deleted successfully" });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});

module.exports = router;

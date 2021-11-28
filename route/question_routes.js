const router = require("express").Router();

const auth = require("../middleware/auth");
const QuestionService = require("../service/question_service");

const questionService = new QuestionService();

router.get("/GetQuestion", auth, async (req, res) => {
	try {
		if (type !== 1 ||type !== 2) throw new Error("Unauthorized", 401);
		const id = req.query.id;
		const question = await questionService.getQuestionByQuizID(id);
		return res.status(200).json({ status: "OK", question: question });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});
router.get("/GetQuestionByQuizID", auth, async (req, res) => {
	try {
		if (type !== 1 ||type !== 2) throw new Error("Unauthorized", 401);
		const quiz_id = req.query.quiz_id;
		const question = await questionService.getQuestionIDByQuizID(quiz_id);
		return res.status(200).json({ status: "OK", question: question });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});
router.put("/UpdateQuestion", auth, async (req, res) => {
	try {
		const type = req.user.type;
		if (type !== 1) throw new Error("Unauthorized", 401);

		const id = req.query.id;
		if (id == null) throw new Error("Bad request", 401);
		const result = await questionService.updateQuestionByID(id, req.body);
		return res.status(200).json({ status: "OK", message: result });
	} catch (err) {
		console.log(err.statusCode);
		return res.status(err.statusCode).json(err);
	}
});

router.delete("/DeleteQuestion", auth, async (req, res) => {
	try {
		if (type !== 1 || type !==0) throw new Error("Unauthorized", 401);
		const type = req.user.type;
		const id = req.query.id;
		const response = await courseService.deleteQuestionByID(id);
		return res.status(200).json({
			status: "OK",
			message: response + " question deleted successfully",
		});
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});
router.post("/CreateQuestion", auth, async (req, res) => {
	try {
		const type = req.user.type;
		if (type !== 1) throw new Error("Unauthorized", 401);

		const result = await questionService.createQuestion(req.body);
		return res.status(200).json({ status: "OK", message: result });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});
module.exports = router;
const router = require("express").Router();

const auth = require("../middleware/auth");
const QuestionService = require("../service/question_service");
const Error = require("../model/error");

const questionService = new QuestionService();

router.get("/", auth, async (req, res) => {
	try {
		//if (type !== 1 ||type !== 0) throw new Error("Unauthorized", 401);
		const type = req.user.type;
		const id = req.query.id;
		if (type !== 1) throw new Error("Unauthorized", 401);
		if (id != null) {
		const question = await questionService.getQuestionByID(id);
		return res.status(200).json({ status: "OK", question: question });
		}
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});
router.get("/QuizID", auth, async (req, res) => {
	try {
		const type = req.user.type;
		const quiz_id = req.query.quiz_id;
		if (type !== 1 ) throw new Error("Unauthorized", 401);
		const question = await questionService.getQuestionByQuizID(quiz_id);
		return res.status(200).json({ status: "OK", question: question });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});
router.put("/", auth, async (req, res) => {
	try {
		const type = req.user.type;
		if (type !== 1) throw new Error("Unauthorized", 401);

		const qid = req.query.qid;
		if (qid == null) throw new Error("Bad request", 401);
		const result = await questionService.updateQuestionByID(qid, req.body);
		return res.status(200).json({ status: "OK", message: result });
	} catch (err) {
		console.log(err.statusCode);
		return res.status(err.statusCode).json(err);
	}
});

router.delete("/", auth, async (req, res) => {
	try {
		const type = req.user.type;
		const id = req.query.id;
		if (type !== 1 || type !==0) throw new Error("Unauthorized", 401);
		const response = await questionService.deleteQuestionByID(id);
		return res.status(200).json({
			status: "OK",
			message: response + " question deleted successfully",
		});
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});
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
module.exports = router;
const router = require("express").Router();

const auth = require("../middleware/auth");
const QuizService = require("../service/quiz_service");
const Error = require("../model/error");

const quizService = new QuizService();

router.get("/", auth, async (req, res) => {
	try {
		const id = req.query.id;
		const quiz = await quizService.getQuizByID(id);
		return res.status(200).json({ status: "OK", quiz: quiz });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});
/*
router.get("/CourseID", auth, async (req, res) => {
	try {

		const course_id = req.query.course_id;
		const quiz = await quizService.getQuizByCourseID(course_id);
		return res.status(200).json({ status: "OK", quiz: quiz });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});
*/
router.put("/", auth, async (req, res) => {
	try {
		const type = req.user.type;
		if (type == 0) throw new Error("Unauthorized", 401);

		const id = req.query.id;
		if (id == null) throw new Error("Bad request", 401);
		const result = await quizService.updateQuizByID(id, req.body);
		return res.status(200).json({ status: "OK", message: result });
	} catch (err) {
		console.log(err.statusCode);
		return res.status(err.statusCode).json(err);
	}
});

router.delete("/", auth, async (req, res) => {
	try {
		const type = req.user.type;
		if (type == 0) throw new Error("Unauthorized", 401);
		const id = req.query.id;
		const response = await quizService.deleteQuizByID(id);
		return res.status(200).json({
			status: "OK",
			message: response + " quiz deleted successfully",
		});
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});
router.post("/", auth, async (req, res) => {
	try {
		const type = req.user.type;
		if (type == 0) throw new Error("Unauthorized", 401);

		const result = await quizService.createQuiz(req.body);
		return res.status(200).json({ status: "OK", message: result });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});
module.exports = router;
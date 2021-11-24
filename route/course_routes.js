const router = require("express").Router();

const auth = require("../middleware/auth");
const CourseService = require("../service/course_service");

const courseService = new CourseService();

router.get("/", auth, async (req, res) => {
	try {
		const semester = req.query.semester;
		const courses = await courseService.getCourseBySemseter(semester, req.user);
		return res.status(200).json({ status: "OK", courses: courses });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});

router.delete("/", auth, async (req, res) => {
	try {
		const type = req.user.type;
		const id = req.query.id;
		const response = await courseService.deleteCourseByID(id, type);
		return res.status(200).json({
			status: "OK",
			message: response + " course deleted successfully",
		});
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});

module.exports = router;

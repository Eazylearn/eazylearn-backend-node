const router = require("express").Router();

const auth = require("../middleware/auth");
const CourseService = require("../service/course_service");
const Error = require("../model/error");
const courseService = new CourseService();

router.post("/", auth, async (req, res) => {
	try {
		const type = req.user.type;
		if (type !== 0) throw new Error("Unauthorized", 401);
		const result = await courseService.createCourse(req.body);
		return res.status(200).json({ status: "OK", message: result });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});

router.post("/assign/student", auth, async (req, res) => {
	try {
		const type = req.user.type;
		if (type !== 0) throw new Error("Unauthorized", 401);
		const result = await courseService.assignStudentToCourse(req.body);
		return res.status(200).json({ status: "OK", message: result });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});

router.post("/assign/lecturer", auth, async (req, res) => {
	try {
		const type = req.user.type;
		if (type !== 0) throw new Error("Unauthorized", 401);
		const result = await courseService.assignLecturerToCourse(req.body);
		return res.status(200).json({ status: "OK", message: result });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});

router.get("/", auth, async (req, res) => {
	try {
		const courseID = req.query.id;
		if (courseID != null) {
			const result = await courseService.getCourseByID(courseID);
			return res.status(200).json({ status: "OK", course: result });
		}
		const semester = req.query.semester;
		const page = req.query.page;

		if (req.user.type === 0) {
			const { courses, maxPage } = await courseService.getCourseBySemester(
				semester,
				req.user,
				page
			);
			return res
				.status(200)
				.json({ status: "OK", courses: courses, maxPage: maxPage });
		}
		const courses = await courseService.getCourseBySemester(
			semester,
			req.user,
			page
		);
		return res.status(200).json({ status: "OK", courses: courses });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});
router.get("/lecturer", auth, async (req, res) => {
	try {
		const courseID = req.query.id;
		if (courseID != null) {
			const result = await courseService.getLecturerByCourseID(courseID);
			return res.status(200).json({ status: "OK", lecturer: result });
		}
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});
router.put("/", auth, async (req, res) => {
	try {
		const type = req.user.type;
		if (type !== 0) throw new Error("Unauthorized", 401);

		const courseID = req.query.id;
		if (courseID == null) throw new Error("Bad request", 401);
		console.log("here");
		await courseService.updateCourseByID(courseID, req.body);
		return res.status(200).json({ status: "OK" });
	} catch (err) {
		console.log(err.statusCode);
		return res.status(err.statusCode).json(err);
	}
});

router.delete("/", auth, async (req, res) => {
	try {
		const type = req.user.type;
		if (type !== 0) throw new Error("Unauthorized", 401);
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

router.delete("/remove/student", auth, async (req, res) => {
	try {
		const type = req.user.type;
		if (type !== 0) throw new Error("Unauthorized", 401);
		const result = await courseService.removeStudentFromCourse(req.body);
		if (result == 0) throw new Error("Not found", 404);
		return res.status(200).json({ status: "OK", message: result });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});

router.delete("/remove/lecturer", auth, async (req, res) => {
	try {
		const type = req.user.type;
		if (type !== 0) throw new Error("Unauthorized", 401);
		const result = await courseService.removeLecturerFromCourse(req.body);
		if (result == 0) throw new Error("Not found", 404);
		return res.status(200).json({ status: "OK", message: result });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});

router.get("/search", async (req, res) => {
	try {
		const query = req.query.query;
		const page = req.query.page;
		const { result, maxPage } = await courseService.search(query, page);
		return res
			.status(200)
			.json({ status: "OK", courses: result, maxPage: maxPage });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});
module.exports = router;

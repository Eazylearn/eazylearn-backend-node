const router = require("express").Router();

const auth = require("../middleware/auth");
const StudentService = require("../service/student_service");
const Error = require("../model/error");

const studentService = new StudentService();

router.get("/", auth, async (req, res) => {
	try {
		if (req.user.type !== 0) throw new Error("Unauthorized", 401);
		const students = await studentService.getAllStudent();
		return res.status(200).json({ status: "Ok", students: students });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});
router.post("/enroll", auth, async (req, res) => {
	try {
		const type = req.user.type;
		if (type !== 2) throw new Error("Unauthorized", 401);
		const studentID= req.user.account_id;
		const result = await studentService.enrollStudentToCourse(req.body,studentID);
		return res.status(200).json({ status: "OK", message: result });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});
module.exports = router;

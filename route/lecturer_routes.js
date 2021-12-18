const router = require("express").Router();

const auth = require("../middleware/auth");
const LecturerService = require("../service/lecturer_service");
const Error = require("../model/error");

const lecturerService = new LecturerService();

router.get("/", auth, async (req, res) => {
	try {
		if (req.user.type !== 0) throw new Error("Unauthorized", 401);
		const lecturers = await lecturerService.getAllLecturers();
		return res.status(200).json({ status: "Ok", lecturers: lecturers });
	} catch (err) {
		return res.status(err.statusCode).json(err);
	}
});

module.exports = router;

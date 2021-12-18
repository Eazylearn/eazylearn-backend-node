const Express = require("express");
const router = Express.Router();

const accountRoutes = require("./account_routes");
const courseRoutes = require("./course_routes");
const questionRoutes = require("./question_routes");
const quizRoutes = require("./quiz_routes");
const uploadRoutes = require("./upload_routes");
const lecturerRoutes = require("./lecturer_routes");
const studentRoutes = require("./student_routes");

router.use("/account", accountRoutes);
router.use("/course", courseRoutes);
router.use("/question", questionRoutes);
router.use("/quiz", quizRoutes);
router.use("/image", uploadRoutes);
router.use("/lecturer", lecturerRoutes);
router.use("/student", studentRoutes);
// more routes here

module.exports = router;

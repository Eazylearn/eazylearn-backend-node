const Course = require("../model/course");
const StudentCourse = require("../model/student_course");
const LecturerCourse = require("../model/lecturer_course");
class CourseRepository {
	async getCourseByStudentID(studentID, semester) {
		try {
			const courses = await StudentCourse.findAll({
				where: {
					student_id: studentID,
				},
				include: {
					model: Course,
					where: semester == null ? null : { semester: semester },
				},
			});

			const result = [];
			courses.forEach((c) => result.push(c.course));
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}

	async getCourseByLecturerID(lecturerID) {
		try {
			const courses = await LecturerCourse.findAll({
				where: {
					lecturer_id: lecturerID,
				},
				include: Course,
			});

			const result = [];
			courses.forEach((c) => result.push(c.course));
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
}

module.exports = CourseRepository;

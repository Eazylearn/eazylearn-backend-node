const Course = require("../model/course");
const StudentCourse = require("../model/student_course");
const LecturerCourse = require("../model/lecturer_course");
class CourseRepository {
	async createCourse(id, name, academicYear, semester) {
		try {
			const result = await Course.create({
				course_id: id,
				course_name: name,
				academic_year: academicYear,
				semester: semester,
			});
			return result;
		} catch (err) {
			throw err;
		}
	}

	async assignStudentToCourse(studentID, courseID) {
		try {
			const result = await StudentCourse.create({
				course_id: courseID,
				student_id: studentID,
			});
			return result;
		} catch (err) {
			throw err;
		}
	}

	async assignLecturerToCourse(lecturerID, courseID) {
		try {
			const result = await LecturerCourse.create({
				course_id: courseID,
				lecturer_id: lecturerID,
			});
			return result;
		} catch (err) {
			throw err;
		}
	}

	async getCourseByID(courseID) {
		try {
			const course = await Course.findOne({
				where: {
					course_id: courseID,
				},
			});
			return course;
		} catch (err) {
			throw err;
		}
	}

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
			throw err;
		}
	}

	async updateCourseByID(qid, id, name, academicYear, semester) {
		try {
			const result = await Course.update(
				{
					course_id: id,
					course_name: name,
					academic_year: academicYear,
					semester: semester,
				},
				{
					where: {
						course_id: qid,
					},
				}
			);
			return result;
		} catch (err) {
			throw err;
		}
	}

	async deleteCourseByID(id) {
		try {
			return await Course.destroy({
				where: {
					course_id: id,
				},
			});
		} catch (err) {
			throw err;
		}
	}

	async removeStudentFromCourse(studentID, courseID) {
		try {
			return await StudentCourse.destroy({
				where: {
					course_id: courseID,
					student_id: studentID,
				},
			});
		} catch (err) {
			throw err;
		}
	}

	async removeLecturerFromCourse(lecturerID, courseID) {
		try {
			return await LecturerCourse.destroy({
				where: {
					course_id: courseID,
					lecturer_id: lecturerID,
				},
			});
		} catch (err) {
			throw err;
		}
	}
}

module.exports = CourseRepository;

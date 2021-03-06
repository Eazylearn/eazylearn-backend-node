const courseRepository = require("../repository/course_repository");
const lecturerRepository = require("../repository/lecturer_repository");
const studentRepository = require("../repository/student_repository");
const Error = require("../model/error");

class CourseService {
	async createCourse(course) {
		try {
			const { id, name, academicYear, semester } = course;
			console.log(academicYear);
			if (id == null || name == null || semester < 0 || semester > 3)
				throw new Error(
					"Bad request" + id + name + academicYear + semester,
					400
				);
			const result = await courseRepository.createCourse(
				id,
				name,
				academicYear,
				semester
			);
			return result;
		} catch (err) {
			console.log(err);
			if (err.statusCode == null) throw new Error(err, 500);
			throw err;
		}
	}

	async assignStudentToCourse(body) {
		if (!body.body || body.body.constructor !== Array)
			throw new Error("Bad request", 400);
		const results = [];
		for (const b of body.body) {
			console.log(b);
			const { studentID, courseID } = b;
			if (studentID == null || courseID == null)
				throw new Error("Bad request", 400);
			try {
				const result = await courseRepository.assignStudentToCourse(
					studentID,
					courseID
				);
				results.push(result);
			} catch (err) {
				console.log(err);
				if (err.statusCode == null) throw new Error(err, 500);
				throw err;
			}
		}
		return results;
	}

	async assignLecturerToCourse(body) {
		if (!body.body || body.body.constructor !== Array)
			throw new Error("Bad request", 400);
		const results = [];
		for (const b of body.body) {
			const { lecturerID, courseID } = b;
			if (lecturerID == null || courseID == null)
				throw new Error("Bad request", 400);
			try {
				const result = await courseRepository.assignLecturerToCourse(
					lecturerID,
					courseID
				);
				results.push(result);
			} catch (err) {
				if (err.statusCode == null) throw new Error(err, 500);
				throw err;
			}
		}
		return results;
	}

	async getCourseByID(id) {
		try {
			const result = await courseRepository.getCourseByID(id);
			if (result == null) throw new Error("Not found", 404);
			return result;
		} catch (err) {
			console.log(err);
			if (err.statusCode == null) throw new Error(err, 500);
			throw err;
		}
	}

	async getCourseBySemester(sem, user, page) {
		try {
			var result;
			if (user.type === 2)
				result = await courseRepository.getCourseByStudentID(
					user.account_id,
					sem
				);
			else if (user.type === 1)
				result = await courseRepository.getCourseByLecturerID(user.account_id);
			else if (user.type === 0) {
				result = await courseRepository.getCourseByAdmin(page, sem);
			}
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw err;
		}
	}

	async updateCourseByID(qid, course) {
		const { id, name, academicYear, semester } = course;
		if (
			qid == null ||
			(id == null &&
				name == null &&
				academicYear == null &&
				semester == null) ||
			semester < 0 ||
			semester > 3
		)
			throw new Error("Bad request", 400);
		try {
			await courseRepository.updateCourseByID(
				qid,
				id,
				name,
				academicYear,
				semester
			);
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw err;
		}
	}

	async deleteCourseByID(id) {
		try {
			const result = await courseRepository.deleteCourseByID(id);
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw err;
		}
	}

	async removeStudentFromCourse(body) {
		if (body.body.constructor !== Array) throw new Error("Bad request", 400);
		const results = [];
		for (const b of body.body) {
			const { studentID, courseID } = b;
			if (studentID == null || courseID == null)
				throw new Error("Bad request", 400);
			try {
				const result = await courseRepository.removeStudentFromCourse(
					studentID,
					courseID
				);
				results.push(result);
			} catch (err) {
				if (err.statusCode == null) throw new Error(err, 500);
				throw err;
			}
		}
		return results;
	}

	async removeLecturerFromCourse(body) {
		if (body.body.constructor !== Array) throw new Error("Bad request", 400);
		const results = [];
		for (const b of body.body) {
			const { lecturerID, courseID } = b;
			if (lecturerID == null || courseID == null)
				throw new Error("Bad request", 400);
			try {
				const result = await courseRepository.removeLecturerFromCourse(
					lecturerID,
					courseID
				);
				results.push(result);
			} catch (err) {
				if (err.statusCode == null) throw new Error(err, 500);
				throw err;
			}
		}
		return results;
	}
	async getLecturerByCourseID(course_id) {
		try {
			console.log("start");
			const result = await courseRepository.getLecturerByCourseID(course_id);

			return result;
		} catch (err) {
			throw Error(err[0].message, 500);
		}
	}
	async getQuizByCourseID(course_id) {
		var result;
		try {
			result = await quizRepository.getQuizByCourseID(course_id);

			return result;
		} catch (err) {
			throw Error(err[0].message, 500);
		}
	}

	async search(query, page) {
		try {
			var course_per_page = 5;
			var courses = await courseRepository.search(query);
			const maxPage = Math.ceil(courses.length / course_per_page);
			if (page == null) page = 0;
			else if (page > maxPage - 1) throw new Error("Bad request", 400);

			page = parseInt(page);

			courses = courses.slice(
				page * course_per_page,
				(page + 1) * course_per_page
			);
			var result = [];
			for (const c of courses) {
				result.push({
					course_id: c.course_id,
					course_name: c.course_name,
					academic_year: c.academic_year,
					semester: c.semester,
					lecturers: await lecturerRepository.getLecturerByCourseID(
						c.course_id
					),
					students: await studentRepository.getStudentByCourseID(c.course_id),
				});
			}
			return {
				result: result,
				maxPage: maxPage,
			};
		} catch (err) {
			console.log(err);
			if (err.statusCode == null) throw new Error(err, 500);
			throw err;
		}
	}
}

module.exports = CourseService;

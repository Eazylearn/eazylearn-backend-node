const CourseRepository = require("../repository/course_repository");
const Error = require("../model/error");

const courseRepository = new CourseRepository();

class CourseService {
	async createCourse(course) {
		try {
			const { id, name, academicYear, semester } = course;
			if (
				id == null ||
				name == null ||
				academicYear == null ||
				semester == null ||
				semester < 0 ||
				semester > 3
			)
				throw new Error("Bad request", 400);
			const result = await courseRepository.createCourse(
				id,
				name,
				academicYear,
				semester
			);
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw new Error(err.message, err.statusCode);
		}
	}

	async assignStudentToCourse(body) {
		const { studentID, courseID } = body;
		if (studentID == null || courseID == null)
			throw new Error("Bad request", 401);
		try {
			const result = await courseRepository.assignStudentToCourse(
				studentID,
				courseID
			);
			return result;
		} catch (err) {
			console.log(err);
			if (err.statusCode == null) throw new Error(err, 500);
			throw new Error(err.message, err.statusCode);
		}
	}

	async assignLecturerToCourse(body) {
		const { lecturerID, courseID } = body;
		if (lecturerID == null || courseID == null)
			throw new Error("Bad request", 401);
		try {
			const result = await courseRepository.assignLecturerToCourse(
				lecturerID,
				courseID
			);
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw new Error(err.message, err.statusCode);
		}
	}

	async getCourseByID(id) {
		try {
			const result = await courseRepository.getCourseByID(id);
			if (result == null) throw new Error("Not found", 404);
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw new Error(err.message, err.statusCode);
		}
	}

	async getCourseBySemester(sem, user) {
		try {
			var result;
			if (user.type === 2)
				result = await courseRepository.getCourseByStudentID(
					user.account_id,
					sem
				);
			else if (user.type === 1)
				result = await courseRepository.getCourseByLecturerID(user.account_id);

			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw new Error(err.message, err.statusCode);
		}
	}

	async updateCourseByID(qid, course) {
		const { id, name, academicYear, semester } = course;
		if (
			qid == null ||
			id == null ||
			name == null ||
			academicYear == null ||
			semester == null ||
			semester < 0 ||
			semester > 3
		)
			throw new Error("Bad request", 401);
		try {
			const result = await courseRepository.updateCourseByID(
				qid,
				id,
				name,
				academicYear,
				semester
			);
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw new Error(err.message, err.statusCode);
		}
	}

	async deleteCourseByID(id) {
		try {
			const result = await courseRepository.deleteCourseByID(id);
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw new Error(err.message, err.statusCode);
		}
	}

	async removeStudentFromCourse(body) {
		const { studentID, courseID } = body;
		if (studentID == null || courseID == null)
			throw new Error("Bad request", 401);
		try {
			const result = await courseRepository.removeStudentFromCourse(
				studentID,
				courseID
			);
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw new Error(err.message, err.statusCode);
		}
	}

	async removeLecturerFromCourse(body) {
		const { lecturerID, courseID } = body;
		if (lecturerID == null || courseID == null)
			throw new Error("Bad request", 401);
		try {
			const result = await courseRepository.removeLecturerFromCourse(
				lecturerID,
				courseID
			);
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw new Error(err.message, err.statusCode);
		}
	}
}

module.exports = CourseService;

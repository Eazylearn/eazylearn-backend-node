const CourseRepository = require("../repository/course_repository");
const Error = require("../model/error");

const courseRepository = new CourseRepository();

class CourseService {
	async getCourseBySemseter(sem, user) {
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
			throw Error(err[0].message, 500);
		}
	}

	async deleteCourseByID(id, type) {
		if (type !== 0) throw new Error("Unauthorized", 401);
		try {
			const result = await Course.destroy({
				where: {
					course_id: id,
				},
			});
			return result;
		} catch (err) {
			throw Error(err[0].message, 500);
		}
	}
}

module.exports = CourseService;

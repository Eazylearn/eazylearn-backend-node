const Student = require("../model/Student");
const StudentCourse = require("../model/student_course");
class StudentRepository {
	async getStudentByCourseID(courseID) {
		try {
			const studentID = await StudentCourse.findAll({
				where: {
					course_id: courseID,
				},
				include: {
					model: Student,
				},
			});

			const result = [];
			studentID.forEach((c) => result.push(c.student));
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
	async getStudentByID(ID) {
		try {
			const student = await Student.findAll({
				where: {
					lecture_id: ID,
				},
			});

			const result = [];
			student.forEach((c) => result.push(c.student));
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
	async deleteStudentByID(id) {
		try {
			const result = await Student.destroy({
				where: {
					student_id: id,
				},
			});
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}

	async createStudentByID(id, name, classID, accountID) {
		try {
			const result = await Student.create({
				student_id: id,
				studentn_name: name,
				class_id: classID,
				account_id: accountID,
			});
			return result;
		} catch (err) {
			throw err;
		}
	}
	async updateStudentByID(qid, id, name, classID, accountID) {
		try {
			const result = await Course.update(
				{
					student_id: id,
					studentn_name: name,
					class_id: classID,
					account_id: accountID,
				},
				{
					where: {
						student_id: qid,
					},
				}
			);
			return result;
		} catch (err) {
			throw err;
		}
	}
}

module.exports = new StudentRepository();

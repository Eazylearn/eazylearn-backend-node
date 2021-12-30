const Student = require("../model/student");
const StudentCourse = require("../model/student_course");
class StudentRepository {
	async getAllStudents() {
		try {
			return await Student.findAll();
		} catch (err) {
			throw err;
		}
	}

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
			studentID.forEach((c) => {
				var student = c.student;
				student.dataValues.status = c.status;
				result.push(student);
			});
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
	async getStudentByID(ID) {
		try {
			const student = await Student.findOne({
				where: {
					student_id: ID,
				},
			});

			return student;
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
					student_name: name,
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
	async enrollStudentByCourseID(courseID, studentID) {
		try {
			const result = await StudentCourse.create({
				course_id: courseID,
				student_id: studentID,
				status: 0,
			});
			return result;
		} catch (err) {
			throw err;
		}
	}
	async approveStudentByCourseID(courseID, studentID) {
		try {
			const result = await StudentCourse.update(
				{
					course_id: courseID,
					student_id: studentID,
					status: 1,
				},
				{
					where: {
						student_id: studentID,
						course_id: courseID,
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

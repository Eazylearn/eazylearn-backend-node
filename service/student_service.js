const QuestionRepository = require("../repository/student_repository");
const Error = require("../model/error");
const StudentRepository = require("../repository/student_repository");
const studentRepository = new StudentRepository();

class StudentService {
	
    async getStudentByID(ID) {
        var result;
		try {
			
				result = await studentRepository.getStudentByID(
					ID
				);
			
			return result;
		} catch (err) {
			throw Error(err[0].message, 500);
		}
	}
    async getStudentIDByCourseID(quiz_id) {
        var result;
		try {
			
				result = await studentRepository.getStudentIDByCourseID(
					course_id
				);
			
			return result;
		} catch (err) {
			throw Error(err[0].message, 500);
		}
	}
	async deleteStudentByID(id) {
		try {
			const result = await studentRepository.deleteStudentByID(id);
			return result;
		} catch (err) {
			throw Error(err[0].message, 500);
		}
	}
	async createStudent(student) {
		if (type !== 1) throw new Error("Unauthorized", 401);
		try {
			const { id, name,class_id ,account_id } = student;
			if (id == null || name == null ||class_id == null ||account_id == null)
				throw new Error("Bad request", 400);
			const result = await studentRepository.createStudent(
				id,
				name,
                class_id,
				account_id
			);
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw new Error(err.message, err.statusCode);
		}
	}
	async updateStudentByID(qid, student) {
		const { id, name,class_id ,account_id } = student;
		if (qid == null || id == null) throw new Error("Bad request", 400);
		try {
			const result = await courseRepository.updateStudentByID(
				qid,
				id,
				name,
                class_id,
				account_id
			);
			return result;
		} catch (err) {
			if (err.statusCode == null) throw new Error(err, 500);
			throw new Error(err.message, err.statusCode);
		}
	}
}

module.exports = StudentService;

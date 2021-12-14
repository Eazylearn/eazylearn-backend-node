const Course = require("../model/course");
const StudentCourse = require("../model/student_course");
const LecturerCourse = require("../model/lecturer_course");
const Lecturer = require("../model/lecturer");
const Student = require("../model/student");

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
			const c = await Course.findOne({
				where: {
					course_id: courseID,
				},
			});
			if (c != null) {
				const students = await this.getStudentByCourseID(courseID);
				const lecturers = await this.getLecturerByCourseID(courseID);
				c.dataValues.students = students;
				c.dataValues.lecturers = lecturers;
			}
			return c;
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
			for (var c of courses) {
				c = c.course;
				const lec = await this.getLecturerByCourseID(c.course_id);
				const stu = await this.getStudentByCourseID(c.course_id);
				const data = {
					course_id: c.course_id,
					course_name: c.course_name,
					academic_year: c.academic_year,
					semester: c.semester,

					lecturers: lec,
					students: stu,
				};
				result.push(data);
			}
			return result;
		} catch (err) {
			console.log(err);
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

	async getLecturerByCourseID(courseID) {
		try {
			const lecturerID = await LecturerCourse.findAll({
				where: {
					course_id: courseID,
				},
				include: {
					model: Lecturer,
				},
			});

			const result = [];
			lecturerID.forEach((c) => result.push(c.lecturer));
			return result;
		} catch (err) {
			console.log(err);
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
			studentID.forEach((c) => result.push(c.student));
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
	async getCourseByAdmin(page ,sem) {
		try {
			const course = await Course.findAll({
				where: sem == null ? null : { semester: sem }
			});
			
			const result = [];
			var data;
			var i = 0;
			const course_per_page = 10;
			for (const c of course) {
				if (i >= (page - 1) * course_per_page && i < page * course_per_page) {
					const lec = await this.getLecturerByCourseID(c.course_id);
					const stu = await this.getStudentByCourseID(c.course_id);
					data = {
						course_id: c.course_id,
						course_name: c.course_name,
						academic_year: c.academic_year,
						semester: c.semester,

						lecturers: lec,
						students: stu,
					};
					result.push(data);
				}
				i++;
			}
			const maxPage= Math.floor(i/course_per_page) + !!(~(i%course_per_page) +1);
			result.push({maxPage})
			//course.forEach((c)=>result.push(c))
			// test.forEach((c)=>result.push(c))
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
}

module.exports = CourseRepository;

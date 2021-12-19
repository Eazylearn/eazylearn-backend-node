const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");
const Student = require("./student");
const Course = require("./course");

const StudentCourse = sequelize.define(
	"student_course",
	{
		student_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		course_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		status: {
			type: DataTypes.STRING,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);
StudentCourse.belongsTo(Student, { foreignKey: "student_id" });
StudentCourse.belongsTo(Course, { foreignKey: "course_id" });
module.exports = StudentCourse;

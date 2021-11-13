const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");

const Course = sequelize.define(
	"course",
	{
		course_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		course_name: {
			type: DataTypes.STRING,
		},
		academic_year: {
			type: DataTypes.STRING,
		},
		semester: {
			type: DataTypes.INTEGER,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = { Course: Course };

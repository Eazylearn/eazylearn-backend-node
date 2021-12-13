const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Image = sequelize.define(
	"image",
	{
		image_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		image_name: {
			type: DataTypes.STRING,
		},
		type: {
			type: DataTypes.STRING,
		},
		data: {
			type: DataTypes.BLOB("long"),
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = Image;

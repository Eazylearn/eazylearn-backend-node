const Express = require("express");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
	`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
	{
		logging: false,
	}
);
var app = Express();

app.listen(process.env.PORT || 8080, () => {
	console.log("Server running!");
});

app.get("/", (req, res) => {
	try {
		sequelize.authenticate();
		res.status(200).send("Eazylearn Backend");
	} catch (err) {
		res.status(500).send(err);
	}
});

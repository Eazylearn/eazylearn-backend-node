const Express = require("express");
const Sequelize = require("sequelize");

const { sequelize } = require("./config/database");

var app = Express();

app.listen(process.env.PORT || 8080, () => {
	try {
		sequelize.authenticate().then(() => {
			console.log("Server running!");
		});
	} catch (err) {
		console.log(err);
	}
});

app.get("/", (req, res) => {
	try {
		res.status(200).send("Eazylearn Backend");
	} catch (err) {
		res.status(500).send(err);
	}
});

const Express = require("express");
const sequelize = require("./config/database");
const routes = require("./route/index");

var app = Express();

app.use(Express.json());
app.use(routes);

app.listen(process.env.PORT || 8080, async () => {
	try {
		await sequelize.authenticate();
		console.log("Server running!");
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

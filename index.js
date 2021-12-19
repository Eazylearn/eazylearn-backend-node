const Express = require("express");
const sequelize = require("./config/database");
const routes = require("./route/index");
const cors = require("cors");

var app = Express();

app.use(Express.json());
app.use(
	cors({
		origin: process.env.ORIGIN,
	})
);
app.use(routes);

app.listen(process.env.PORT || 8080, async () => {
	try {
		await sequelize.authenticate();
		//await sequelize.sync({ force: true });
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

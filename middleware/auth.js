require("dotenv").config;
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	var token = req.headers.authorization;
	if (token.split(" ")[0] === "Bearer") token = token.split(" ")[1];
	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}
	try {
		const decoded = jwt.verify(token, process.env.TOKEN_KEY);
		console.log(decoded);
		req.user = decoded;
	} catch (err) {
		return res.status(401).send("Invalid token");
	}
	return next();
};

module.exports = verifyToken;

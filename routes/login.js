const express = require("express");
const router = express.Router();
const { dashBoard } = require("../model/data");
const authentication = require("../controllers/authenticatoin");

router.get("/", (req, res) => {
	res.render("login-page", { message: "", className: "" });
});

router.post("/", async (req, res) => {
	req.session.user = req.body;

	const isCorrectCredentials = await authentication.authenticateCredentials(
		req.session.user.uname,
		req.session.user.password
	);

	if (isCorrectCredentials) res.redirect("/dashboard");
	else {
		res.render("login-page", {
			message: "Incorrect username or password",
			className: "was-validated",
		});
	}
});

module.exports = router;

const express = require("express");
const router = express.Router();
const dashboardContent = require("../model/data");
const authenticateCredentials = require("../controllers/authenticatoin");

router.get("/", async (req, res) => {
	let isCorrectCredentials;
	try {
		isCorrectCredentials = await authenticateCredentials(
			req.session.user.uname,
			req.session.user.password
		);
		console.log(isCorrectCredentials);
	} catch (error) {
		isCorrectCredentials = false;
	}

	if (isCorrectCredentials) {
		res.render("../views/dashboard-page", { dashboardContent });
		if (req.session.user.remember != "true") req.session.destroy();
	} else {
		res.redirect("/login");
	}
});

module.exports = router;

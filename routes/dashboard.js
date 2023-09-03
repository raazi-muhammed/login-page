const express = require("express");
const router = express.Router();
const dashboardContent = require("../model/data");
const authentication = require("../controllers/authenticatoin");

router.get("/", async (req, res) => {
	let userID;
	try {
		userID = await authentication.authenticateCredentials(
			req.session.user.uname,
			req.session.user.password
		);
	} catch (error) {
		userID = false;
	}

	if (userID) {
		let userDetails = authentication.loginDetails[userID];
		res.render("../views/dashboard-page", { dashboardContent, userDetails });
		if (req.session.user.remember != "true") req.session.destroy();
	} else {
		res.redirect("/login");
	}
});

module.exports = router;

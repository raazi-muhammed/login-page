const express = require("express");
const router = express.Router();
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

	if (userID == 0) {
		res.render("../views/admin-page", {
			usersDetails: authentication.loginDetails,
		});
	} else {
		res.render("../views/login-page", {
			message: "Do not have Admin Access",
			className: "",
		});
	}
});

module.exports = router;

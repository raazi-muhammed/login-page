const express = require("express");
const router = express.Router();
const dashboardContent = require("../model/data");
const bcrypt = require("bcrypt");

function checkCredentials(req, res, next) {
	const loginDetails = {
		email: "admin@admin.com",
		password: "admin", //admin
	};

	try {
		if (
			req.session.user.uname == loginDetails.email &&
			req.session.user.password == loginDetails.password
		) {
			next();
		} else {
			throw new Error();
		}
	} catch (error) {
		console.log("check catch");
		res.redirect("/login");
	}
}

router.get("/", checkCredentials, (req, res) => {
	res.render("../views/dashboard-page", { dashboardContent });
	if (req.session.user.remember != "true") req.session.destroy();
});

module.exports = router;

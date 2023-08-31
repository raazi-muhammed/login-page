const express = require("express");
const router = express.Router();
const dashboardContent = require("../model/data");
const bcrypt = require("bcrypt");
const checkCredentials = require("../controllers/checkCredentials");

router.use(function (req, res, next) {
	res.set(
		"Cache-Control",
		"no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
	);
	next();
});

router.get("/", (req, res) => {
	res.render("../views/dashboard-page", { dashboardContent });
	if (req.session.user.remember != "true") req.session.destroy();
});

module.exports = router;

const express = require("express");
const router = express.Router();

router.use(function (req, res, next) {
	res.set(
		"Cache-Control",
		"no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
	);
	next();
});

router.post("/", (req, res) => {
	try {
		req.session.destroy();
	} catch (error) {
		console.log(error);
	}
	res.render("../views/login-page", {
		message: "Logout Successful",
		className: "",
	});
});

module.exports = router;

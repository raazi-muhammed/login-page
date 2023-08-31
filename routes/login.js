const express = require("express");
const router = express.Router();

const loginDetails = {
	email: "admin@admin.com",
	password: "admin",
};

//back button to homepage
router.use(function (req, res, next) {
	res.set(
		"Cache-Control",
		"no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
	);
	next();
});

router.get("/", (req, res) => {
	res.render("login-page", { message: "", className: "Hi" });
});

router.post("/", (req, res) => {
	if (
		req.body.uname == loginDetails.email &&
		req.body.password == loginDetails.password
	) {
		req.session.user = req.body;
		res.redirect("/dashboard");
	} else {
		console.log("HIH");
		res.render("login-page", {
			message: "Incorrect username or password",
			className: "was-validated",
		});
	}
});

module.exports = router;

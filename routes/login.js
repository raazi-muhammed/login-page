const express = require("express");
const router = express.Router();

const loginDetails = {
	email: "admin@admin.com",
	password: "admin",
};

router.get("/", (req, res) => {
	res.render("login-page", { message: "", className: "Hi" });
});

router.post("/", (req, res) => {
	if (
		req.body.uname == loginDetails.email &&
		req.body.password == loginDetails.password
	) {
		req.session.user = req.body.uname;
		res.redirect("/dashboard");
		console.log("rsu: " + req.body.uname);

		if (!req.body.remember) {
			try {
				console.log("body.remeber");
				/* req.body.uname = "guest"; */
				/* req.session.destroy(); */
			} catch (error) {
				console.log(error);
			}
		}
	} else {
		console.log("HIH");
		res.render("login-page", {
			message: "Incorrect username or password",
			className: "was-validated",
		});
	}
});

module.exports = router;

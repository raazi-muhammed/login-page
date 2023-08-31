const express = require("express");
const router = express.Router();

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

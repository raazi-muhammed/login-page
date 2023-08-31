const express = require("express");
const router = express.Router();
const session = require("express-session");
const { dashBoard } = require("../model/data");
const bcrypt = require("bcrypt");

async function hashPass(password) {
	try {
		const hashedPass = await bcrypt.hash(password, 10);
		console.log(hashedPass);
	} catch (error) {
		console.log(error);
	}
}

function checkCredentials(req, res, next) {
	console.log(req.session.user);
	/* const loginDetails = {
		email: "admin@admin.com",
		password: "$2b$10$hm3Oj5L/hASs.7.drRSBLe6FIbjiImfyxlBmjhVw7u/UhRs9DnA3K", //admin
	};

	try {
		const passCorrect = await bcrypt.compare(
			req.session.user.password,
			loginDetails.password
		);
		if (req.session.user.uname == loginDetails.email && passCorrect) {
			next();
		} else {
			throw new Error("Hi");
		}
	} catch (error) {
		console.log("check catch");
		res.render("login-page", {
			message: "Incorrect username or password",
			className: "was-validated",
		});
	} */
}

function test(req, res, next) {
	console.log(req.session.user);
	next();
}
router.get("/", (req, res) => {
	res.render("login-page", { message: "", className: "Hi" });
});

router.post("/", test, async (req, res) => {
	req.session.user = req.body;

	const loginDetails = {
		email: "admin@admin.com",
		password: "$2b$10$hm3Oj5L/hASs.7.drRSBLe6FIbjiImfyxlBmjhVw7u/UhRs9DnA3K", //admin
	};

	try {
		const passCorrect = await bcrypt.compare(
			req.session.user.password,
			loginDetails.password
		);
		console.log(passCorrect);
		if (req.session.user.uname == loginDetails.email && passCorrect) {
			res.redirect("/dashboard");
		} else {
			throw new Error("Hi");
		}
	} catch (error) {
		console.log("check catch");
		res.render("login-page", {
			message: "Incorrect username or password",
			className: "was-validated",
		});
	}
});

module.exports = router;

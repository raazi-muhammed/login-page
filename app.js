const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const { send } = require("process");

/* const showIncorrectUsername = require("showIncorrectUsername"); */

const PORT = 3000;
const loginDetails = {
	email: "admin@admin.com",
	password: "admin",
};

app.set("view engine", "ejs");

//parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//session
app.use(
	session({
		secret: uuidv4(),
		resave: false,
		saveUninitialized: true,
	})
);

//static
app.use("/static", express.static(path.join(__dirname, "/public")));

//home page
app.get("/", (req, res) => {
	if (req.session.user) {
		res.redirect("/dashboard");
		/* res.render("dashboard-page"); */
	} else {
		res.render("login-page");
	}
});

app.post("/login", (req, res) => {
	console.log(req.body.uname);
	if (
		req.body.uname == loginDetails.email &&
		req.body.password == loginDetails.password
	) {
		req.session.user = req.body.uname;
		res.redirect("/dashboard");
		console.log("rsu: " + req.session.user);
	} else {
		console.log("INCORRECT");
	}
});

app.get("/dashboard", (req, res) => {
	console.log("das: " + session.user);
	if (req.session.user) {
		res.render("dashboard-page");
	} else {
		res.redirect("/");
	}
});

app.post("/logout", (req, res) => {
	req.session.destroy();
	res.redirect("/");
});

app.listen(PORT, () => {
	console.log("Server Started");
});

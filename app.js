const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const { send } = require("process");

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
	res.render("login-page");
});

app.post("/login", (req, res) => {
	console.log(req.body.uname);
	if (
		req.body.uname == loginDetails.email &&
		req.body.password == loginDetails.password
	) {
		req.session.user = req.body.email;
		res.redirect("/dashboard");
		console.log("Hi");
		res.send("HHI");
	} else {
		console.log("INCORRECT");
	}
});

app.get("/dashboard", (req, res) => {
	res.render("dashboard-page");
});

app.listen(PORT, () => {
	console.log("Server Started");
});

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const dashboard = require("./routes/dashboard");
const login = require("./routes/login");

const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const PORT = 3000;

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
	if (req.session.user) res.redirect("/dashboard");
	if (!req.session.user) res.redirect("/login");
});

//back button to homepage
app.use(function (req, res, next) {
	res.set(
		"Cache-Control",
		"no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
	);
	next();
});

app.use("/login", login);
app.use("/dashboard", dashboard);

app.post("/logout", (req, res) => {
	try {
		req.session.destroy();
	} catch (error) {
		console.log(error);
	}
	res.render("login-page", { message: "Logout Successful", className: "" });
});

app.listen(PORT, () => {
	console.log("Server Started");
});

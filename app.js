const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const dashboard = require("./routes/dashboard");
const login = require("./routes/login");
const logout = require("./routes/logout");
const admin = require("./routes/admin");
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

//back button to homepage
app.use(function (req, res, next) {
	res.set(
		"Cache-Control",
		"no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
	);
	next();
});

//home page
app.get("/", (req, res) => {
	if (req.session.user) res.redirect("/dashboard");
	if (!req.session.user) res.redirect("/login");
});

app.use("/login", login);
app.use("/dashboard", dashboard);
app.use("/logout", logout);
app.use("/admin", admin);

app.listen(PORT, () => {
	console.log(`Server Started on ${PORT}`);
});

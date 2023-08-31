async function hashPass(password) {
	try {
		const hashedPass = await bcrypt.hash(password, 10);
		console.log(hashedPass);
	} catch (error) {
		console.log(error);
	}
}

async function checkCredentials(req, res, next) {
	const loginDetails = {
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
		res.redirect("/login");
	}
}

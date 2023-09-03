const bcrypt = require("bcrypt");

//use this to get the hashed version of the password
async function hashPass(password) {
	try {
		const hashedPass = await bcrypt.hash(password, 10);
		console.log(hashedPass);
	} catch (error) {
		console.log(error);
	}
}

async function authenticateCredentials(username, pass) {
	const loginDetails = {
		email: "admin@admin.com",
		password: "$2b$10$hm3Oj5L/hASs.7.drRSBLe6FIbjiImfyxlBmjhVw7u/UhRs9DnA3K", //admin
	};

	try {
		const passCorrect = await bcrypt.compare(pass, loginDetails.password);

		if (username == loginDetails.email && passCorrect) return true;
		return false;
	} catch (error) {
		console.log(error);
		return false;
	}
}

module.exports = authenticateCredentials;

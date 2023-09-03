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

const loginDetails = [
	{
		name: "Admin",
		email: "admin@admin.com",
		password: "$2b$10$hm3Oj5L/hASs.7.drRSBLe6FIbjiImfyxlBmjhVw7u/UhRs9DnA3K", //admin
		admin: "Admin",
	},
	{
		name: "Raazi",
		email: "raazi@gmail.com",
		password: "$2b$10$hm3Oj5L/hASs.7.drRSBLe6FIbjiImfyxlBmjhVw7u/UhRs9DnA3K", //admin
		admin: "Not Admin",
	},
	{
		name: "Tom",
		email: "tom@gmail.com",
		password: "$2b$10$iSvW2NNZTji8uuhDnQsX5eFgTbFZbnv5sooMKvBcuoBy8D6r2e1zK", //tom
		admin: "Not Admin",
	},
];

let userID;

async function authenticateCredentials(username, pass) {
	try {
		for (const key in loginDetails) {
			const passCorrect = await bcrypt.compare(
				pass,
				loginDetails[key].password
			);
			if (username == loginDetails[key].email && passCorrect) {
				userID = key;

				return userID;
			}
		}

		return false;
	} catch (error) {
		console.log(error);
		return false;
	}
}

module.exports = { authenticateCredentials, userID, loginDetails };

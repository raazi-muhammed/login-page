/* Form */
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
	if (!form.checkValidity()) {
		e.preventDefault();
	}
	form.classList.add("was-validated");
});

/* forgot password */
document.getElementById("forget-password").addEventListener("click", () => {
	alert("Please contact your admin to change the password");
});

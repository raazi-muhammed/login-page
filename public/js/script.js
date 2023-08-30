/* If browser back button was used, flush cache */
(function () {
	window.onpageshow = function (event) {
		if (event.persisted) {
			window.location.reload();
		}
	};
})();

/* Form */
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
	if (!form.checkValidity()) {
		e.preventDefault();
	}
	form.classList.add("was-validated");
});

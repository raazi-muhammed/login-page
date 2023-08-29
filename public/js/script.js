try {
	document.querySelector("#btn-login").addEventListener("click", () => {
		setTimeout(() => {
			document
				.querySelector("#incorrect-username")
				.classList.replace("d-none", "d-block");
		}, 200);
	});
} catch (error) {
	console.log("Alerst are not working");
}

try {
	document.querySelector("#btn-logout").addEventListener("click", () => {
		setTimeout(() => {
			document
				.querySelector("#logout-success")
				.classList.replace("d-none", "d-block");
		}, 200);
	});
} catch (error) {
	console.log("LOUTOUT");
}

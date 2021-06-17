const editUserButton = document.querySelector("#editUser");
const backButton = document.querySelector("#backButton");
const reviseButton = document.querySelector("#reviseButton");
const informations = document.querySelector("#informations");

reviseButton.disabled = true;

backButton.addEventListener("click", () => {
	window.location.href = document.referrer;
});

editUserButton.addEventListener("click", () => {
	reviseButton.disabled = false;

	const username = document.querySelector("#username").textContent;
	const email = document.querySelector("#email").textContent;

	const usernameParagraph = document.querySelector("#username");
	const emailParagraph = document.querySelector("#email");

	let usernameInput = document.createElement("input");
	let emailInput = document.createElement("input");

	let passwordHeader = document.createElement("h2");
	let passwordInput = document.createElement("input");
	let passwordConfirmationInput = document.createElement("input");

	usernameInput.id = "usernameInput";
	emailInput.id = "emailInput";
	usernameInput.value = username.trim();
	emailInput.value = email.trim();
	usernameInput.placeholder = "Inserisci Username";
	emailInput.placeholder = "Inserisci email";

	passwordHeader.textContent = "Cambia Password:";

	passwordInput.id = "passwordInput";
	passwordConfirmationInput.id = "passwordConfirmationInput";

	passwordInput.type = "password";
	passwordConfirmationInput.type = "password";

	passwordInput.placeholder = "Inserire nuova password";
	passwordConfirmationInput.placeholder = "Confermare password";

	informations.replaceChild(usernameInput, usernameParagraph);
	informations.replaceChild(emailInput, emailParagraph);
	informations.appendChild(passwordHeader);
	informations.appendChild(passwordInput);
	informations.appendChild(passwordConfirmationInput);
});

reviseButton.addEventListener("click", () => {
	if (document.querySelector("#err"))
		informations.removeChild(document.querySelector("#err"));

	const username = document.querySelector("#usernameInput");
	const email = document.querySelector("#emailInput");
	const password = document.querySelector("#passwordInput");
	const passwordConfirmation = document.querySelector(
		"#passwordConfirmationInput"
	);

	const userId = window.location.href.split("/")[4];

	let data = {};

	const regexEmail =
		/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
	const regexPassword = /^[A-Za-z0-9].{7,15}$/;

	if (!password.value && !passwordConfirmation.value) {
		if (email.value.match(regexEmail)) {
			data = {
				userId,
				username: username.value,
				email: email.value,
				password: "",
			};
			fetch(`http://localhost:8080/user/${userId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}).then(response => (window.location.href = response.url));
		} else {
			const errorMessage = document.createElement("p");
			errorMessage.id = "err";
			errorMessage.textContent = "Email non valida";

			informations.appendChild(errorMessage);
		}
	} else if (password.value === passwordConfirmation.value) {
		if (
			password.value.match(regexPassword) &&
			email.value.match(regexEmail)
		) {
			data = {
				userId,
				username: username.value,
				email: email.value,
				password: password.value,
			};

			fetch(`http://localhost:8080/user/${userId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}).then(response => (window.location.href = response.url));
		} else {
			const errorMessage = document.createElement("p");
			errorMessage.id = "err";
			errorMessage.textContent = "Password o email non valida";

			informations.appendChild(errorMessage);
		}
	} else {
		const errorMessage = document.createElement("p");
		errorMessage.id = "err";
		errorMessage.textContent = "Le due password non coincidono";

		informations.appendChild(errorMessage);
	}
});

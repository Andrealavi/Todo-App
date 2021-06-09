const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const usernameInput = document.querySelector("#username");
const registrationButton = document.querySelector("#registrationButton");

registrationButton.disabled = true;
let validEmail, validPassword;

const emailValidation = () => {
	const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

	if (emailInput.value.match(regex)) {
		emailInput.classList.remove("invalidEmail");
		emailInput.classList.add("validEmail");
		validEmail = true;
	} else if (emailInput.value === "") {
		emailInput.classList.remove("invalidEmail");
		emailInput.classList.remove("validEmail");
		validEmail = false;
	} else {
		emailInput.classList.remove("validEmail");
		emailInput.classList.add("invalidEmail");
		validEmail = false;
	}
};

const passwordValidation = () => {
	const regex = /^[A-Za-z0-9].{7,15}$/;

	if (passwordInput.value.match(regex)) {
		passwordInput.classList.remove("invalidPassword");
		passwordInput.classList.add("validPassword");
		validPassword = true;
	} else if (passwordInput.value === "") {
		passwordInput.classList.remove("validPassword");
		passwordInput.classList.remove("invalidPassword");
		validPassword = false;
	} else {
		passwordInput.classList.remove("validPassword");
		passwordInput.classList.add("invalidPassword");
		validPassword = false;
	}
};

const buttonValidation = () => {
	if (validEmail && validPassword && usernameInput.value !== "")
		registrationButton.disabled = false;
	else registrationButton.disabled = true;
};

emailInput.addEventListener("change", () => {
	emailValidation();
	buttonValidation();
});

emailInput.addEventListener("keydown", () => {
	emailValidation();
	buttonValidation();
});

passwordInput.addEventListener("change", () => {
	passwordValidation();
	buttonValidation();
});

passwordInput.addEventListener("keydown", () => {
	passwordValidation();
	buttonValidation();
});

usernameInput.addEventListener("change", () => {
	buttonValidation();
});

usernameInput.addEventListener("keydown", () => {
	buttonValidation();
});

registrationButton.addEventListener("click", e => {
	e.preventDefault();

	const data = {
		username: usernameInput.value,
		email: emailInput.value,
		password: passwordInput.value,
	};

	fetch("http://localhost:8080/registration", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then(res => (window.location.href = res.url));
});

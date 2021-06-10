const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const loginButton = document.querySelector("#loginButton");

loginButton.disabled = true;
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
		validEmail = falses;
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
	if (validEmail && validPassword) loginButton.disabled = false;
	else loginButton.disabled = true;
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

loginButton.addEventListener("click", e => {
	e.preventDefault();

	const data = {
		email: emailInput.value,
		password: passwordInput.value,
	};

	fetch("http://localhost:8080/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then(res => (window.location.href = res.url));
});

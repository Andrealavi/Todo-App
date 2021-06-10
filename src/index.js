const express = require("express");
const { join } = require("path");
const hbs = require("hbs");
const User = require("./models/user.js");

const app = express();
const PORT = 8080;

// Paths for express config
const publicDirectoryPath = join(__dirname, "../public");
const viewsPath = join(__dirname, "../templates/views");
const partialsPath = join(__dirname, "../templates/partials");

// Setting up the public folder to serve
app.use(express.static(publicDirectoryPath));
app.use(express.json());

// Express configuration
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
	if (req.query.err) res.render("login", { message: req.query.err });
	else res.render("login");
});

app.get("/registration", (req, res) => {
	if (req.query.err === "email")
		res.render("registration", {
			message: "Esiste già un account con questa email",
		});
	else if (req.query.err === "username")
		res.render("registration", {
			message: "Esiste già un account con questo username",
		});
	else res.render("registration");
});

app.get("/homepage/:id", (req, res) => res.render("homepage"));

app.post("/login", async (req, res) => {
	const userLogin = await new User().login(req.body.email, req.body.password);

	if (typeof userLogin === "object")
		res.redirect(`/homepage/${userLogin.id}`);
	else res.redirect(`/?err=${userLogin}`);
});

app.post("/registration", async (req, res) => {
	if (!(await new User().isUsed("email", req.body.email)))
		res.redirect("/registration?err=email");
	else if (!(await new User().isUsed("username", req.body.username)))
		res.redirect("/registration?err=username");
	else {
		const user = await new User().newUser(
			req.body.username,
			req.body.email,
			req.body.password
		);

		res.redirect(`/homepage/${user.id}`);
	}
});

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

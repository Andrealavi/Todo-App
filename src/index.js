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

app.get("/", (req, res) => res.render("login"));

app.get("/registration", (req, res) => res.render("registration"));

app.get("/homepage/:id", (req, res) => res.render("homepage"));

app.post("/login", async (req, res) => {
	const user = await User.newUser(req.body.email, req.body.password);
});

app.post("/registration", async (req, res) => {
	const user = await new User().newUser(
		req.body.username,
		req.body.email,
		req.body.password
	);

	res.status(301).redirect(`/homepage/${user.id}`);
});

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

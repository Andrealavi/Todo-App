const express = require("express");
const { join } = require("path");
const hbs = require("hbs");

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

app.get("/users/:id", (req, res) => res.render("users"));

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

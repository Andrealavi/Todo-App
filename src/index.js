const express = require("express");
const { join } = require("path");
const hbs = require("hbs");
const User = require("./models/user.js");
const Task = require("./models/task.js");

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

app.get("/homepage/:id", async (req, res) => {
	let tasks;

	if (req.query.title && req.query.title !== "")
		tasks = await new Task().searchTask(req.query.title);
	else tasks = await new Task().listTasks(req.params.id);

	res.render("homepage", { tasks: tasks });
});

app.get("/homepage/:id/task", (req, res) => res.render("task"));

app.get("/homepage/:userId/taskPanel/:taskId", (req, res) =>
	res.render("taskControlPanel")
);

app.get("/homepage/:userId/task/:taskId", async (req, res) => {
	const task = await new Task().findTask(req.params.taskId);

	res.render("taskView", {
		title: task.title,
		description: task.description,
	});
});

app.get("/homepage/:id/userPanel", async (req, res) => {
	const user = await new User().findUser(req.params.id);

	res.render("userPanel", { username: user.username, email: user.email });
});

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

app.post("/task", async (req, res) => {
	await new Task().newTask(
		req.body.title,
		req.body.description,
		req.body.userId
	);

	res.redirect(`/homepage/${req.body.userId}`);
});

app.post("/task/:id", async (req, res) => {
	const task = await new Task().findTask(req.params.id);

	res.send(
		JSON.stringify({
			title: task.title,
			description: task.description,
		})
	);
});

app.delete("/task/:id", async (req, res) => {
	await new Task().deleteTask(req.params.id);
});

app.patch("/task/:id", async (req, res) => {
	await new Task().updateTask(
		req.params.id,
		req.body.title,
		req.body.description
	);

	res.redirect(`/homepage/${req.body.userId}`);
});

app.patch("/user/:id", async (req, res) => {
	await new User().updateUser(
		req.body.userId,
		req.body.username,
		req.body.email,
		req.body.password
	);

	res.redirect(`/homepage/${req.body.userId}`);
});

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

const taskButton = document.querySelector("#taskButton");
const userButton = document.querySelector("#userButton");
const searchButton = document.querySelector(".searchButton");
const deleteButtons = document.querySelectorAll("#deleteButton");
const completedButtons = document.querySelectorAll("#completedButton");
const reviseButtons = document.querySelectorAll("#reviseButton");
const tasks = document.querySelectorAll("#task");
const alert = document.querySelector("#alert");

taskButton.addEventListener("click", () => {
	window.location.href += "/task";
});

userButton.addEventListener("click", () => {
	let split_href = window.location.href.split("/");

	let id = split_href[4];

	if (split_href[4].split("?").length > 1) {
		id = split_href[4].split("?")[0];
	}

	window.location.href =
		split_href.slice(0, 4).join("/") + "/" + id + "/userPanel";
});

searchButton.addEventListener("click", e => {
	e.preventDefault();

	const search = document.querySelector("#searchInput").value;

	let title = `?title=${search}`;

	let split_href = window.location.href.split("/");

	let id = split_href[4];

	if (split_href[4].split("?").length > 1) {
		id = split_href[4].split("?")[0];
	}

	window.location.href = split_href.slice(0, 4).join("/") + "/" + id + title;
});

for (const deleteButton of deleteButtons) {
	deleteButton.addEventListener("click", e => {
		e.stopPropagation();

		const taskId =
			deleteButton.parentNode.parentNode.parentNode.parentNode.getAttribute(
				"taskId"
			);
		console.log(taskId);

		fetch(`http://localhost:8080/task/${taskId}`, {
			method: "DELETE",
		});

		location.reload();
	});
}

for (const completedButton of completedButtons) {
	completedButton.addEventListener("click", e => {
		e.stopPropagation();

		const taskId =
			completedButton.parentNode.parentNode.parentNode.parentNode.getAttribute(
				"taskId"
			);

		fetch(`http://localhost:8080/task/${taskId}`, {
			method: "DELETE",
		});

		alert.style.visibility = "visible";

		setTimeout(() => {
			location.reload();
		}, 1000);
	});
}

for (const reviseButton of reviseButtons) {
	reviseButton.addEventListener("click", e => {
		e.stopPropagation();

		const taskId =
			reviseButton.parentNode.parentNode.parentNode.parentNode.getAttribute(
				"taskId"
			);

		let split_href = window.location.href.split("/");

		let id = split_href[4];

		if (split_href[4].split("?").length > 1) {
			id = split_href[4].split("?")[0];
		}

		window.location.href =
			split_href.slice(0, 4).join("/") +
			"/" +
			id +
			`/taskPanel/${taskId}`;
	});
}

for (const task of tasks) {
	task.addEventListener("click", e => {
		e.stopPropagation();

		const taskId = task.getAttribute("TaskId");

		let split_href = window.location.href.split("/");

		let id = split_href[4];

		if (split_href[4].split("?").length > 1) {
			id = split_href[4].split("?")[0];
		}

		window.location.href =
			split_href.slice(0, 4).join("/") + "/" + id + `/task/${taskId}`;
	});
}

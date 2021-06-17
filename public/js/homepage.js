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
	window.location.href += "/userPanel";
});

searchButton.addEventListener("click", e => {
	e.preventDefault();

	const search = document.querySelector("#searchInput").value;

	window.location.href = document.referrer + `?title=${search}`;
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
		console.log(taskId);

		window.location.href += `/taskPanel/${taskId}`;
	});
}

for (const task of tasks) {
	task.addEventListener("click", e => {
		e.stopPropagation();

		const taskId = task.getAttribute("TaskId");

		window.location.href += `/task/${taskId}`;
	});
}

"use strict";

const taskTitle = document.querySelector("#taskTitle");
const taskDescription = document.querySelector("#taskDescription");
const taskButton = document.querySelector("#taskButton");

taskButton.addEventListener("click", e => {
	e.preventDefault();

	const data = {
		title: taskTitle.value,
		description: taskDescription.value,
		userId: window.location.href.split("/")[4],
	};

	fetch("http://localhost:8080/task", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then(res => {
		window.location.href = res.url;
	});
});

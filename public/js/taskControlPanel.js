"use strict";

const taskTitle = document.querySelector("#taskTitle");
const taskDescription = document.querySelector("#taskDescription");
const taskButton = document.querySelector("#taskButton");

const taskId = window.location.href.split("/")[6];

fetch(`http://localhost:8080/task/${taskId}`, {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
})
	.then(res => res.json())
	.then(task => {
		taskTitle.value = task.title;
		taskDescription.value = task.description;
	});

taskButton.addEventListener("click", e => {
	e.preventDefault();

	const userId = window.location.href.split("/")[4];

	const data = {
		title: taskTitle.value,
		description: taskDescription.value,
		userId,
	};

	fetch(`http://localhost:8080/task/${taskId}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	window.location.href = document.referrer;
});

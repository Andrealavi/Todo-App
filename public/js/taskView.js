const backButton = document.querySelector("#backButton");
const completeButton = document.querySelector("#completeButton");

backButton.addEventListener("click", () => {
	window.location.href = document.referrer;
});

completeButton.addEventListener("click", () => {
	const taskId = window.location.href.split("/")[6];

	fetch(`http://localhost:8080/task/${taskId}`, {
		method: "DELETE",
	});

	window.location.href = document.referrer;
});
